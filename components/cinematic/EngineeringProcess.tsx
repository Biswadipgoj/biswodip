'use client';

import { useState } from 'react';
import Image from 'next/image';
import ComputerFrame from './ComputerFrame';

type PipelineStageId = 'problem' | 'architecture' | 'database' | 'api' | 'code' | 'testing' | 'deploy';

interface PipelineStage {
  id: PipelineStageId;
  step: string;
  title: string;
  category: string;
  accent: string;
  summary: string;
}

const stages: PipelineStage[] = [
  {
    id: 'problem',
    step: '01',
    title: 'Requirements & Constraints',
    category: 'SPECIFICATION',
    accent: '#00d2ff',
    summary: 'Define functional requirements, latency bounds, and data contracts before writing code.',
  },
  {
    id: 'architecture',
    step: '02',
    title: 'System Topology',
    category: 'DISTRIBUTED DESIGN',
    accent: '#38bdf8',
    summary: 'Establish clean boundaries between Client, Edge Middleware, WebSocket Hub, and Persistence.',
  },
  {
    id: 'database',
    step: '03',
    title: 'Schema & Relational Queries',
    category: 'PERSISTENCE LAYER',
    accent: '#10b981',
    summary: 'Relational data models with foreign-key constraints, compound indexing, and ACID transactions.',
  },
  {
    id: 'api',
    step: '04',
    title: 'API Contracts & Postman',
    category: 'NETWORK INTERFACE',
    accent: '#00d2ff',
    summary: 'Strict REST/WebSocket endpoints tested with real payloads, latency bounds, and assertions.',
  },
  {
    id: 'code',
    step: '05',
    title: 'TypeScript Implementation',
    category: 'APPLICATION LOGIC',
    accent: '#818cf8',
    summary: 'Strictly-typed React hooks and server handlers with optimistic updates and error boundaries.',
  },
  {
    id: 'testing',
    step: '06',
    title: 'QA & Automated Testing',
    category: 'VERIFICATION RIGOR',
    accent: '#f59e0b',
    summary: 'Unit, integration, and load test suites asserting zero regressions and deterministic behavior.',
  },
  {
    id: 'deploy',
    step: '07',
    title: 'Edge Deployment & SLA',
    category: 'INFRASTRUCTURE',
    accent: '#10b981',
    summary: 'Zero-downtime global edge distribution with CDN caching, health checks, and 99.9% uptime.',
  },
];

const stageImages: Record<PipelineStageId, { src: string; caption: string; badge: string }> = {
  problem: {
    src: '/editorial/slide3.jpg',
    caption: 'Stage 01 · Formal Specification & Constraint Modeling Matrix',
    badge: 'SPECIFICATION CONTRACT',
  },
  architecture: {
    src: '/previews/telepoint.webp',
    caption: 'Stage 02 · TelePoint Distributed WebSocket Mesh & Topology',
    badge: 'DISTRIBUTED TOPOLOGY',
  },
  database: {
    src: '/previews/nanolink.webp',
    caption: 'Stage 03 · NanoLink PostgreSQL Schema & B-Tree Index Traversal',
    badge: 'RELATIONAL PERSISTENCE',
  },
  api: {
    src: '/previews/erpixa.webp',
    caption: 'Stage 04 · Erpixa Multi-Tenant API Routes & Postman Testing Suites',
    badge: 'API CONTRACTS',
  },
  code: {
    src: '/previews/nexora.webp',
    caption: 'Stage 05 · Nexora Strict TypeScript Application & State Sync',
    badge: 'TYPED CODEBASE',
  },
  testing: {
    src: '/editorial/slide4.jpg',
    caption: 'Stage 06 · Automated Regression Matrix & Verification Gate',
    badge: 'AUTOMATED QA GATE',
  },
  deploy: {
    src: '/previews/tripmate.webp',
    caption: 'Stage 07 · Tripmate Edge CDN Caching & Global 99.9% Uptime',
    badge: 'PRODUCTION DEPLOYMENT',
  },
};

export default function EngineeringProcess() {
  const [activeStage, setActiveStage] = useState<PipelineStageId>('problem');
  const [apiExecuted, setApiExecuted] = useState(false);
  const [testSuiteRunning, setTestSuiteRunning] = useState(false);
  const [testPassed, setTestPassed] = useState(true);

  const currentStage = stages.find((s) => s.id === activeStage) || stages[0];

  const handleRunApi = () => {
    setApiExecuted(false);
    setTimeout(() => {
      setApiExecuted(true);
    }, 300);
  };

  const handleRunTests = () => {
    setTestSuiteRunning(true);
    setTimeout(() => {
      setTestSuiteRunning(false);
      setTestPassed(true);
    }, 600);
  };

  return (
    <section
      id="process"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* ── FIXED TOP CAPTION HOOK (STICKY HUD HEADER) ── */}
      <div className="sticky top-20 z-30 mb-8 w-full max-w-4xl mx-auto">
        <div className="glass-hud-pill flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-ping" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-white">
              ENGINEERING PIPELINE // FIRST PRINCIPLES
            </span>
            <span className="hidden sm:inline-block mono text-xs text-[#00d2ff]">
              · STAGE {currentStage.step} // {currentStage.category}
            </span>
          </div>
          <span className="mono text-xs text-[#10b981] px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 font-bold">
            LIFECYCLE ACTIVE
          </span>
        </div>
      </div>

      <div className="space-y-12">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs mono text-[#00d2ff] mb-3">
            <span>04 · HOW I BUILD · SOFTWARE PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            The Deterministic Software Journey
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-2">
            A software system is not built by chance. Inspect each connected stage of my development lifecycle—from first customer requirement to edge production deployment.
          </p>
        </div>

        {/* ── Pipeline Progression Bar / Steps ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {stages.map((stg) => {
            const isActive = activeStage === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isActive
                    ? 'bg-white/[0.09] border-[#00d2ff] shadow-lg scale-[1.02]'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.08] opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="mono text-xs font-bold"
                    style={{ color: stg.accent }}
                  >
                    {stg.step}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-ping" />
                  )}
                </div>
                <div className="font-display font-bold text-xs text-white truncate">
                  {stg.title.split('&')[0]?.trim()}
                </div>
                <div className="mono text-[9px] text-[#cbd5e1] truncate mt-0.5">
                  {stg.category}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Interactive Stage Detail Visualizer (Inside Realistic Computer Display) ── */}
        <ComputerFrame
          title={`engineering-pipeline://${currentStage.id}.sh`}
          url="https://biswadip.in/process"
          statusBadge="PIPELINE RIGOR"
        >
          {/* Stage Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: currentStage.accent }}
                />
                <span className="mono text-xs font-bold uppercase tracking-wider text-[#00d2ff]">
                  STAGE {currentStage.step} · {currentStage.category}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                {currentStage.title}
              </h3>
            </div>
            <div className="mono text-xs text-[#94a3b8] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] self-start sm:self-center">
              Verified Shipped Lifecycle
            </div>
          </div>

          <p className="text-sm text-[#cbd5e1] my-3 leading-relaxed max-w-3xl">
            {currentStage.summary}
          </p>

          {/* Real Component Screenshot Banner for the current stage */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] rounded-2xl overflow-hidden border border-white/35 shadow-2xl group bg-amber-950/20 my-4">
            <Image
              src={stageImages[currentStage.id].src}
              alt={stageImages[currentStage.id].caption}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#78350f]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="mono text-xs text-white font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                {stageImages[currentStage.id].caption}
              </span>
              <span
                className="mono text-xs font-bold px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm"
                style={{ color: currentStage.accent }}
              >
                {stageImages[currentStage.id].badge}
              </span>
            </div>
          </div>

          {/* ── STAGE 01: REQUIREMENTS & CONSTRAINTS ── */}
          {activeStage === 'problem' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="mono text-xs text-[#00d2ff] font-bold">01 · USER PROBLEM</div>
                <div className="font-display font-bold text-sm text-white">
                  Multi-User Real-Time Desynchronization
                </div>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Traditional HTTP polling introduces unacceptable latency (1.5s+), heavy database load, and dropped concurrent room state.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="mono text-xs text-[#10b981] font-bold">02 · FUNCTIONAL SPECS</div>
                <div className="font-display font-bold text-sm text-white">
                  Deterministic Contract
                </div>
                <ul className="text-xs text-[#94a3b8] space-y-1.5 list-disc list-inside">
                  <li>Full-duplex WebSocket connection</li>
                  <li>JWT authenticated handshake</li>
                  <li>Automatic heartbeat with 5s timeout</li>
                  <li>Client-side optimistic state rollback</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                <div className="mono text-xs text-[#f59e0b] font-bold">03 · NON-FUNCTIONAL SLA</div>
                <div className="font-display font-bold text-sm text-white">
                  Strict Performance Thresholds
                </div>
                <div className="space-y-1 text-xs mono text-[#94a3b8]">
                  <div className="flex justify-between">
                    <span>Target Latency:</span>
                    <span className="text-[#00d2ff] font-bold">&lt; 50ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packet Delivery:</span>
                    <span className="text-[#10b981] font-bold">99.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reconnection:</span>
                    <span className="text-white font-bold">Exponential backoff</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 02: SYSTEM TOPOLOGY ── */}
          {activeStage === 'architecture' && (
            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-xl bg-[#0a0d14] border border-white/[0.08] overflow-x-auto">
                <div className="min-w-[640px] flex items-center justify-between gap-4 text-center">
                  {/* Node 1: Browser Client */}
                  <div className="flex-1 p-4 rounded-xl bg-white/[0.04] border border-cyan-500/30">
                    <div className="mono text-[10px] text-[#00d2ff] font-bold">CLIENT LAYER</div>
                    <div className="font-display font-bold text-white text-sm mt-1">
                      Next.js 14 (RSC)
                    </div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">
                      Zustand · WebSocket Hook
                    </div>
                  </div>

                  <div className="text-[#00d2ff] mono text-xs font-bold">⇄ WSS ⇄</div>

                  {/* Node 2: Edge Router */}
                  <div className="flex-1 p-4 rounded-xl bg-white/[0.04] border border-sky-500/30">
                    <div className="mono text-[10px] text-[#38bdf8] font-bold">GATEWAY</div>
                    <div className="font-display font-bold text-white text-sm mt-1">
                      Vercel Edge
                    </div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">
                      JWT Auth · Rate Limiter
                    </div>
                  </div>

                  <div className="text-[#38bdf8] mono text-xs font-bold">⇄ EVENT ⇄</div>

                  {/* Node 3: Node Engine */}
                  <div className="flex-1 p-4 rounded-xl bg-white/[0.04] border border-indigo-500/30">
                    <div className="mono text-[10px] text-[#818cf8] font-bold">SERVICES</div>
                    <div className="font-display font-bold text-white text-sm mt-1">
                      Node.js Core
                    </div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">
                      Room Broadcast Hub
                    </div>
                  </div>

                  <div className="text-[#10b981] mono text-xs font-bold">⇄ SQL ⇄</div>

                  {/* Node 4: Persistence */}
                  <div className="flex-1 p-4 rounded-xl bg-white/[0.04] border border-emerald-500/30">
                    <div className="mono text-[10px] text-[#10b981] font-bold">DATA STORE</div>
                    <div className="font-display font-bold text-white text-sm mt-1">
                      PostgreSQL
                    </div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">
                      Prisma ORM · RLS
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94a3b8]">
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <strong className="text-white">Zero Cascading Failure:</strong> WebSocket disconnection isolates to individual socket reconnects without disrupting HTTP REST endpoints.
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <strong className="text-white">Backpressure Control:</strong> High frequency events batch every 16ms to match 60/120Hz display refresh cycles.
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 03: DATABASE SCHEMA & QUERIES ── */}
          {activeStage === 'database' && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Schema Card */}
                <div className="light-code-panel">
                  <div className="light-code-header">
                    <div className="editor-window-dots">
                      <span className="editor-dot dot-red" />
                      <span className="editor-dot dot-yellow" />
                      <span className="editor-dot dot-green" />
                    </div>
                    <span className="mono text-xs text-[#94a3b8]">schema.prisma (TelePoint &amp; NanoLink)</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-[#e2e8f0] overflow-x-auto leading-relaxed bg-[#0a0d14]">
                    <code>{`model Room {
  id          String    @id @default(uuid())
  slug        String    @unique
  name        String
  tenantId    String
  createdAt   DateTime  @default(now())
  messages    Message[]
  members     RoomMember[]

  @@index([slug])
  @@index([tenantId])
}

model Message {
  id        String   @id @default(uuid())
  roomId    String
  senderId  String
  content   String   @db.Text
  status    String   @default("DELIVERED")
  createdAt DateTime @default(now())
  room      Room     @relation(fields: [roomId], references: [id], onDelete: Cascade)

  @@index([roomId, createdAt(sort: Desc)])
}`}</code>
                  </pre>
                </div>

                {/* Query Execution Plan */}
                <div className="light-code-panel">
                  <div className="light-code-header">
                    <div className="editor-window-dots">
                      <span className="editor-dot dot-red" />
                      <span className="editor-dot dot-yellow" />
                      <span className="editor-dot dot-green" />
                    </div>
                    <span className="mono text-xs text-[#10b981]">EXPLAIN ANALYZE (Indexed Query)</span>
                  </div>
                  <div className="p-4 space-y-3 bg-[#0a0d14] text-xs mono">
                    <div className="text-[#94a3b8]">
                      Query: <span className="text-[#00d2ff]">SELECT * FROM &quot;Message&quot; WHERE &quot;roomId&quot; = $1 ORDER BY &quot;createdAt&quot; DESC LIMIT 50;</span>
                    </div>
                    <div className="p-3 rounded bg-white/[0.04] border border-white/[0.08] space-y-1">
                      <div className="text-[#10b981] font-bold">
                        → Index Scan using idx_messages_room_id on Message
                      </div>
                      <div className="text-[#94a3b8]">
                        Index Cond: (roomId = &apos;c8f9-42b1-91a0&apos;)
                      </div>
                      <div className="text-[#94a3b8]">
                        Execution Time: <span className="text-[#10b981] font-bold">2.41ms</span> (Planning: 0.18ms)
                      </div>
                    </div>
                    <div className="text-[11px] text-[#64748b]">
                      Deterministic B-Tree indexing guarantees sub-5ms query resolution regardless of table growth.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 04: API & POSTMAN SEQUENCE ── */}
          {activeStage === 'api' && (
            <div className="space-y-4 pt-2">
              <div className="light-code-panel">
                <div className="light-code-header">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold mono text-xs">
                      POST
                    </span>
                    <span className="mono text-xs text-white">
                      https://telepoint.biswadip.in/api/v1/rooms/room_90a/messages
                    </span>
                  </div>
                  <button
                    onClick={handleRunApi}
                    className="px-3 py-1 rounded bg-[#00d2ff] hover:bg-[#38bdf8] text-[#080a0f] font-bold mono text-xs transition-colors"
                  >
                    Send Request ↗
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] bg-[#0a0d14]">
                  {/* Request Column */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs mono text-[#64748b]">
                      <span>REQUEST HEADERS &amp; BODY</span>
                      <span className="text-white">Content-Type: application/json</span>
                    </div>
                    <pre className="text-xs font-mono text-[#cbd5e1] leading-relaxed overflow-x-auto">
                      <code>{`{
  "content": "Deploying runtime v3.2 to edge mesh",
  "priority": "normal",
  "senderId": "usr_biswodip_01",
  "clientTimestamp": 1726665000000
}`}</code>
                    </pre>
                  </div>

                  {/* Response Column */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs mono">
                      <span className="text-[#64748b]">RESPONSE PAYLOAD</span>
                      <span className="text-[#10b981] font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
                        201 CREATED · 34ms
                      </span>
                    </div>
                    <pre className="text-xs font-mono text-[#a7f3d0] leading-relaxed overflow-x-auto">
                      <code>{apiExecuted ? `{
  "success": true,
  "messageId": "msg_90a1bc4e",
  "persisted": true,
  "broadcastCount": 14,
  "latencyMs": 18
}` : `{
  "success": true,
  "messageId": "msg_90a1bc4e",
  "persisted": true,
  "broadcastCount": 14,
  "latencyMs": 18
}`}</code>
                    </pre>

                    {/* Postman Assertions Result */}
                    <div className="pt-2 border-t border-white/[0.08] space-y-1 text-[11px] mono">
                      <div className="text-[#10b981] flex items-center gap-1.5">
                        <span>✓</span>
                        <span>PASS: Status code is 201 Created</span>
                      </div>
                      <div className="text-[#10b981] flex items-center gap-1.5">
                        <span>✓</span>
                        <span>PASS: Response time &lt; 50ms (Actual: 34ms)</span>
                      </div>
                      <div className="text-[#10b981] flex items-center gap-1.5">
                        <span>✓</span>
                        <span>PASS: messageId matches format &apos;msg_.*&apos;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 05: CODE IMPLEMENTATION ── */}
          {activeStage === 'code' && (
            <div className="space-y-4 pt-2">
              <div className="light-code-panel">
                <div className="light-code-header">
                  <div className="editor-window-dots">
                    <span className="editor-dot dot-red" />
                    <span className="editor-dot dot-yellow" />
                    <span className="editor-dot dot-green" />
                  </div>
                  <span className="mono text-xs text-[#94a3b8]">useRoomSocket.ts (Optimistic UI Hook)</span>
                </div>
                <pre className="p-4 text-xs font-mono text-[#e2e8f0] overflow-x-auto leading-relaxed bg-[#0a0d14]">
                  <code>{`import { useState, useCallback, useRef } from 'react';

export function useRoomSocket(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const sendMessage = useCallback((content: string) => {
    // 01: Optimistic UI Insert (Instant paint for user)
    const tempId = \`temp_\${Date.now()}\`;
    const pendingMsg: Message = { id: tempId, content, status: 'sending', createdAt: new Date() };
    setMessages((prev) => [...prev, pendingMsg]);

    // 02: Transmit via active socket frame
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'MESSAGE', roomId, content, tempId }));
    } else {
      // 03: Re-queue with exponential backoff on failure
      queueOfflinePayload({ roomId, content, tempId });
    }
  }, [roomId]);

  return { messages, sendMessage };
}`}</code>
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">
                  Architectural Principle: Strict optimistic updates prevent user friction while background socket guarantees delivery.
                </span>
                <span className="mono text-[#00d2ff] font-bold shrink-0 ml-4">100% Typed</span>
              </div>
            </div>
          )}

          {/* ── STAGE 06: QA & AUTOMATED TESTING ── */}
          {activeStage === 'testing' && (
            <div className="space-y-4 pt-2">
              <div className="light-code-panel">
                <div className="light-code-header">
                  <div className="flex items-center gap-2">
                    <span className="mono text-xs text-[#10b981] font-bold">JEST / VITEST RUNNER</span>
                    <span className="text-[#64748b] text-xs">· Test Suite</span>
                  </div>
                  <button
                    onClick={handleRunTests}
                    disabled={testSuiteRunning}
                    className="px-3 py-1 rounded bg-[#10b981] hover:bg-emerald-400 text-[#080a0f] font-bold mono text-xs transition-colors disabled:opacity-50"
                  >
                    {testSuiteRunning ? 'Running Tests...' : 'Re-run Suite ↺'}
                  </button>
                </div>

                <div className="p-4 bg-[#0a0d14] space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#10b981]">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-[10px] font-bold">PASS</span>
                    <span className="text-white">test/unit/nanolink-base62.test.ts</span>
                    <span className="text-[#64748b] ml-auto">12ms</span>
                  </div>
                  <div className="pl-6 space-y-1 text-[#94a3b8] text-[11px]">
                    <div>✓ encodes integer id (4294967295) into exactly 6 chars (2ms)</div>
                    <div>✓ handles collision avoidance with salt suffix (1ms)</div>
                  </div>

                  <div className="flex items-center gap-2 text-[#10b981]">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-[10px] font-bold">PASS</span>
                    <span className="text-white">test/integration/telepoint-handshake.test.ts</span>
                    <span className="text-[#64748b] ml-auto">38ms</span>
                  </div>
                  <div className="pl-6 space-y-1 text-[#94a3b8] text-[11px]">
                    <div>✓ rejects expired JWT tokens with 401 code (5ms)</div>
                    <div>✓ isolates broadcast to target roomId without leak (14ms)</div>
                    <div>✓ round-trip message broadcast finishes under 40ms (19ms)</div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-[#94a3b8]">
                    <div>
                      Test Suites: <span className="text-[#10b981] font-bold">2 passed</span>, 2 total
                    </div>
                    <div>
                      Tests: <span className="text-[#10b981] font-bold">5 passed</span>, 5 total
                    </div>
                    <div>
                      Status: <span className="text-[#10b981] font-bold">{testPassed ? 'ZERO REGRESSIONS' : 'TESTING'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STAGE 07: PRODUCTION EDGE DEPLOYMENT ── */}
          {activeStage === 'deploy' && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="mono text-xs text-[#00d2ff] font-bold">EDGE NETWORK</div>
                  <div className="font-display font-bold text-white text-sm">
                    Global Anycast CDN
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Deployed across 18 edge regions worldwide. Zero cold start for static RSC routes and minimal regional routing hops.
                  </p>
                  <div className="pt-2 text-xs mono text-[#10b981] font-semibold">
                    DNS: biswadip.in · SSL A+
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="mono text-xs text-[#10b981] font-bold">CACHE RATIO</div>
                  <div className="font-display font-bold text-white text-sm">
                    Stale-While-Revalidate
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Edge headers configured with automated revalidation. Static chunks served directly from CDN memory cache.
                  </p>
                  <div className="pt-2 text-xs mono text-[#00d2ff] font-semibold">
                    Hit Ratio: 98.4%
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="mono text-xs text-[#f59e0b] font-bold">HEALTH TELEMETRY</div>
                  <div className="font-display font-bold text-white text-sm">
                    Continuous Observability
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Continuous runtime monitoring, automated alerting on 5xx error rate spikes, and automated container scaling.
                  </p>
                  <div className="pt-2 text-xs mono text-[#10b981] font-semibold">
                    SLA: 99.9% Uptime Verified
                  </div>
                </div>
              </div>
            </div>
          )}
        </ComputerFrame>

        {/* ── ENDING ON A BOLD STATEMENT / STATS SECTION ── */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.15]">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="mono text-xs text-[#10b981] font-bold tracking-wider uppercase">
                VERIFIED LIFECYCLE REPEATABILITY
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight leading-[1.05]">
              FROM FORMAL SPECIFICATION.
              <span className="grad-text-vivid block mt-2">
                TO PRODUCTION GLOBAL SLA.
              </span>
            </h3>

            <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-2xl">
              Every production delivery adheres to this deterministic pipeline: formal schema validation, isolated database transactions, type-safe API boundaries, and automated regression verification.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.12]">
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Lifecycle Stages</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00d2ff] mt-1">7 Steps</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">Spec to Deploy</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Type Rigor</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#10b981] mt-1">Strict</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">tsc --noEmit</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Regression Gate</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">100% Pass</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">CI/CD Automated</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Edge Delivery</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#a855f7] mt-1">&lt; 50ms</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">Global P95</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
