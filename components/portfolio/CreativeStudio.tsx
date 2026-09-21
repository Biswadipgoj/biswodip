'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRightIcon } from '@/components/icons';
import { animate, stagger } from 'animejs';

interface StageNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  tech: string;
  badge: string;
  badgeClass: string;
}

const STAGES: StageNode[] = [
  {
    id: 'input',
    step: '01',
    title: 'Requirements & Flow',
    subtitle: 'Domain entities & business rules',
    tech: 'Business Analysis',
    badge: 'Verified',
    badgeClass: 'badge-emerald'
  },
  {
    id: 'boundary',
    step: '02',
    title: 'Zod Perimeter',
    subtitle: 'Deterministic contract validation',
    tech: 'TypeScript + Zod',
    badge: 'Enforced',
    badgeClass: 'badge-amber'
  },
  {
    id: 'security',
    step: '03',
    title: 'PostgreSQL RLS',
    subtitle: 'Row-Level multi-tenant security',
    tech: 'PostgreSQL 16',
    badge: 'Isolated',
    badgeClass: 'badge-cyan'
  },
  {
    id: 'delivery',
    step: '04',
    title: 'Production State',
    subtitle: 'Next.js 15 SSR & deterministic API',
    tech: 'Next.js 15 · Docker',
    badge: '200 OK',
    badgeClass: 'badge-emerald'
  }
];

const SNIPPETS = {
  zod: `// Deterministic Perimeter Boundary Contract
import { z } from 'zod';

export const CreateWorkflowSchema = z.object({
  tenantId: z.string().uuid(),
  action: z.enum(['RECONCILE', 'SETTLE', 'AUDIT']),
  amount: z.number().positive().max(10_000_000),
  idempotencyKey: z.string().min(16),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type CreateWorkflowInput = z.infer<typeof CreateWorkflowSchema>;`,
  prisma: `// PostgreSQL Multi-Tenant Schema with RLS
model Workspace {
  id        String   @id @default(uuid())
  slug      String   @unique
  name      String
  users     User[]
  records   Record[]
  createdAt DateTime @default(now())
}

model Record {
  id          String    @id @default(uuid())
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  payload     Json
  // Row-Level Security: workspace_id = auth.current_tenant()
}`,
  sql: `-- PostgreSQL 16 Row-Level Security (RLS) Policy
ALTER TABLE tenant_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON tenant_transactions
  FOR ALL
  USING (
    workspace_id = NULLIF(
      current_setting('app.current_tenant_id', true), ''
    )::uuid
  )
  WITH CHECK (
    workspace_id = NULLIF(
      current_setting('app.current_tenant_id', true), ''
    )::uuid
  );`
};

export default function CreativeStudio() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'code' | 'telemetry'>('architecture');
  const [activeStage, setActiveStage] = useState<string>('boundary');
  const [codeTab, setCodeTab] = useState<'zod' | 'prisma' | 'sql'>('zod');
  const [speed, setSpeed] = useState<'normal' | 'turbo'>('normal');
  const [burstActive, setBurstActive] = useState<boolean>(false);
  const [rlsIsolated, setRlsIsolated] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(1024);
  const [copied, setCopied] = useState<boolean>(false);
  const burstTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Continuous background packet counter ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((c) => (c + 1) % 99999);
    }, speed === 'turbo' ? 200 : 600);
    return () => clearInterval(interval);
  }, [speed]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fluid scroll entry & return-to-hero physics via Anime.js
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let hasEntered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEntered) {
            hasEntered = true;
            try {
              animate('.architecture-substrate .substrate-node', {
                scale: [0.85, 1.45, 1],
                opacity: [0.25, 1, 0.45],
                delay: stagger(1.4, { grid: [32, 32], from: 'center' }),
                duration: 700,
                ease: 'outCubic'
              });
            } catch {}
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Dynamic wave when user scrolls up back into the opening section
    let lastScroll = window.scrollY;
    let waveCooldown = 0;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      const now = Date.now();
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView && currentScroll < lastScroll && Math.abs(currentScroll - lastScroll) > 5 && now - waveCooldown > 1100) {
        waveCooldown = now;
        try {
          animate('.architecture-substrate .substrate-node', {
            scale: [0.92, 1.38, 1],
            opacity: [0.3, 0.95, 0.45],
            delay: stagger(1.2, { grid: [32, 32], from: 'center' }),
            duration: 650,
            ease: 'outQuad'
          });
        } catch {}
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const triggerBurst = () => {
    setBurstActive(true);
    setPacketCount((c) => c + 32);
    clearTimeout(burstTimeout.current);
    burstTimeout.current = setTimeout(() => {
      setBurstActive(false);
    }, 1600);

    // Anime.js 2D radial wave pulse across all 1,024 kinetic logic nodes
    try {
      animate('.architecture-substrate .substrate-node', {
        scale: [1, 1.65, 1],
        opacity: [0.35, 1, 0.45],
        delay: stagger(1.5, { grid: [32, 32], from: 'center' }),
        duration: 750,
        ease: 'outCubic'
      });
    } catch {}
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPETS[codeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const currentStage = STAGES.find((s) => s.id === activeStage) || STAGES[1];

  return (
    <div
      ref={containerRef}
      className="hero-main-image creative-studio glass-panel"
      aria-label="1,024-Node Interactive Software Architecture Engine"
    >
      {/* Chrome Top Bar */}
      <div className="studio-chrome">
        <div className="chrome-controls" aria-hidden="true">
          <span className="dot dot-close" />
          <span className="dot dot-min" />
          <span className="dot dot-max" />
        </div>

        <div className="chrome-tabs" role="tablist" aria-label="Architecture studio tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'architecture'}
            className={`chrome-tab ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            ⚡ System Architecture (1,024 Nodes)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'code'}
            className={`chrome-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            {'{ }'} Code &amp; RLS Contracts
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'telemetry'}
            className={`chrome-tab ${activeTab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setActiveTab('telemetry')}
          >
            📊 System Health
          </button>
        </div>

        <div className="chrome-live-indicator">
          <span className="live-orb-beacon" />
          <span className="live-status-text">60 FPS ACTIVE</span>
        </div>
      </div>

      {/* Main View: System Architecture with 1,024 Animated Nodes */}
      {activeTab === 'architecture' && (
        <div className="studio-body architecture-view">
          {/* Top Interactive Controls Bar */}
          <div className="architecture-toolbar">
            <button
              type="button"
              className={`tool-action-btn burst-btn ${burstActive ? 'burst-active' : ''}`}
              onClick={triggerBurst}
              title="Emit an accelerated pulse wave across all 1,024 nodes"
            >
              <span>{burstActive ? '⚡ Energy Pulse Active!' : '⚡ Trigger Surge Wave'}</span>
            </button>

            <button
              type="button"
              className={`tool-action-btn rls-btn ${rlsIsolated ? 'rls-active' : 'rls-bypassed'}`}
              onClick={() => setRlsIsolated(!rlsIsolated)}
              title="Toggle Multi-Tenant Row-Level Security Barrier"
            >
              <span>{rlsIsolated ? '🛡️ Tenant Isolation: ENFORCED' : '⚠️ Tenant Isolation: BYPASS'}</span>
            </button>

            <div className="speed-toggle-group">
              <span className="speed-label">FLOW:</span>
              <button
                type="button"
                className={`speed-btn ${speed === 'normal' ? 'active' : ''}`}
                onClick={() => setSpeed('normal')}
              >
                1x
              </button>
              <button
                type="button"
                className={`speed-btn ${speed === 'turbo' ? 'active' : ''}`}
                onClick={() => setSpeed('turbo')}
              >
                TURBO
              </button>
            </div>
          </div>

          {/* 4 Connected Milestone Stages with Traveling Particle Stream */}
          <div className="architecture-stages-container">
            {/* SVG Fiber-Optic Connection Bus with 8 Continuous Traveling Light Pulses */}
            <svg className="stages-bus-svg" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 500 24">
              <line x1="10" y1="12" x2="490" y2="12" className="bus-rail" />
              <line x1="10" y1="12" x2="490" y2="12" className={`bus-pulse pulse-1 speed-${speed}`} />
              <line x1="10" y1="12" x2="490" y2="12" className={`bus-pulse pulse-2 speed-${speed}`} />
              <line x1="10" y1="12" x2="490" y2="12" className={`bus-pulse pulse-3 speed-${speed}`} />
            </svg>

            <div className="stages-grid" role="list">
              {STAGES.map((stage) => {
                const isSelected = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="listitem"
                    className={`stage-card ${isSelected ? 'selected' : ''} ${burstActive ? 'bursting' : ''}`}
                    onClick={() => setActiveStage(stage.id)}
                  >
                    <div className="stage-top">
                      <span className="stage-step">{stage.step}</span>
                      <span className={`stage-badge ${stage.badgeClass}`}>{stage.badge}</span>
                    </div>
                    <strong className="stage-title">{stage.title}</strong>
                    <span className="stage-tech">{stage.tech}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Substrate: EXACTLY 1,024 ACTIVELY ANIMATED LOGIC NODES */}
          <div className="substrate-section">
            <div className="substrate-header">
              <div className="substrate-title-wrap">
                <span className="substrate-title">KINETIC ARCHITECTURE SUBSTRATE</span>
                <span className="substrate-count-pill">1,024 ACTIVE LOGIC NODES</span>
              </div>
              <div className="substrate-wave-indicator">
                <span className="wave-bar bar-1" />
                <span className="wave-bar bar-2" />
                <span className="wave-bar bar-3" />
                <span className="wave-bar bar-4" />
                <span className="wave-bar bar-5" />
                <span className="stream-label">STREAMING 60FPS</span>
              </div>
            </div>

            {/* The 1,024-Node Reactive Matrix Grid */}
            <div
              className={`architecture-substrate ${burstActive ? 'surge-mode' : ''} speed-${speed}`}
              aria-label="1,024 continuously animated software logic nodes"
            >
              {Array.from({ length: 1024 }).map((_, i) => {
                const col = i % 32;
                const row = Math.floor(i / 32);
                const delay = ((col * 0.05 + row * 0.04) % 2.4).toFixed(2);
                return (
                  <span
                    key={i}
                    className="substrate-node"
                    style={{
                      '--delay': `${delay}s`,
                      '--col': col,
                      '--row': row
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          </div>

          {/* Active Stage Inspection Footer */}
          <div className="stage-inspector-strip" aria-live="polite">
            <div className="inspector-left">
              <span className="inspector-tag">STAGE {currentStage.step} {'//'}</span>
              <strong className="inspector-title">{currentStage.title}:</strong>
              <span className="inspector-desc">{currentStage.subtitle}</span>
            </div>
            <div className="inspector-right">
              <span className="inspector-tech">{currentStage.tech}</span>
            </div>
          </div>
        </div>
      )}

      {/* Code Tab */}
      {activeTab === 'code' && (
        <div className="studio-body code-view">
          <div className="code-subtabs" role="tablist">
            <button
              type="button"
              className={`code-subtab ${codeTab === 'zod' ? 'active' : ''}`}
              onClick={() => setCodeTab('zod')}
            >
              contract.ts (Zod)
            </button>
            <button
              type="button"
              className={`code-subtab ${codeTab === 'prisma' ? 'active' : ''}`}
              onClick={() => setCodeTab('prisma')}
            >
              schema.prisma (PostgreSQL RLS)
            </button>
            <button
              type="button"
              className={`code-subtab ${codeTab === 'sql' ? 'active' : ''}`}
              onClick={() => setCodeTab('sql')}
            >
              rls_policy.sql (Row-Level Security)
            </button>

            <button type="button" className="code-copy-btn" onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>

          <pre className="code-editor-area">
            <code>{SNIPPETS[codeTab]}</code>
          </pre>
        </div>
      )}

      {/* Telemetry Tab */}
      {activeTab === 'telemetry' && (
        <div className="studio-body telemetry-view">
          <div className="telemetry-cards-grid">
            <div className="tele-metric-card">
              <span className="tele-tag">ACTIVE SUBSTRATE</span>
              <strong className="tele-val">1,024 Nodes</strong>
              <span className="tele-sub">Synchronized 60fps kinetic logic</span>
            </div>
            <div className="tele-metric-card">
              <span className="tele-tag">SHIPPED SYSTEMS</span>
              <strong className="tele-val">50+ Shipped</strong>
              <span className="tele-sub">Remote teams &amp; independent builds</span>
            </div>
            <div className="tele-metric-card">
              <span className="tele-tag">API LATENCY</span>
              <strong className="tele-val">14ms p99</strong>
              <span className="tele-sub">Deterministic Zod boundaries</span>
            </div>
            <div className="tele-metric-card">
              <span className="tele-tag">DATA ISOLATION</span>
              <strong className="tele-val">PostgreSQL RLS</strong>
              <span className="tele-sub">Row-Level multi-tenant security</span>
            </div>
          </div>

          <div className="tele-statusbar">
            <div className="status-live-item">
              <span className="green-live-dot" />
              <span>Full-Stack Architecture: Next.js 15 · TypeScript · PostgreSQL · Python</span>
            </div>
            <span className="tele-packets">Packets Streamed: {packetCount.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Studio Bottom Bar */}
      <div className="studio-bottom-bar">
        <span className="bottom-tech">FULL-STACK ARCHITECTURE // NEXT.JS 15 · TYPESCRIPT · POSTGRESQL · PYTHON</span>
        <a href="#projects" className="bottom-cta">
          Explore Systems <ArrowUpRightIcon aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
