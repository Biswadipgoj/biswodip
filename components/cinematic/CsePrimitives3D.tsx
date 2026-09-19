'use client';

/**
 * CSS 3D CSE Primitives — software-world objects built entirely with
 * CSS transform-style: preserve-3d and perspective.
 *
 * Objects:
 *  - DatabaseCylinder  : Prisma / PostgreSQL storage layer
 *  - ApiBoundaryBox    : Request/response cube
 *  - CodeBracketFrame  : { } syntax frame
 *  - GitOrbit          : Branching commit rings
 *  - NetworkNode       : Connected API sphere cluster
 *  - SchemaCard        : Floating Prisma schema card
 *
 * All animate via CSS keyframes. Mouse parallax applied via data-depth on wrapper.
 * No Three.js, no WebGL, no canvas — pure CSS preserve-3d.
 */

/* ── Database Cylinder ───────────────────────────────────────────────── */
export function DatabaseCylinder({ className = '' }: { className?: string }) {
  return (
    <div className={`prim3d-wrap ${className}`} data-depth="0.4" aria-hidden="true">
      <div className="db-cylinder">
        <div className="db-face db-top">
          <span className="db-label">PostgreSQL</span>
        </div>
        <div className="db-face db-side db-s1" />
        <div className="db-face db-side db-s2" />
        <div className="db-face db-side db-s3" />
        <div className="db-face db-side db-s4" />
        <div className="db-face db-side db-s5" />
        <div className="db-face db-side db-s6" />
        <div className="db-face db-side db-s7" />
        <div className="db-face db-side db-s8" />
        <div className="db-face db-bottom" />
        <div className="db-ring db-ring-1" />
        <div className="db-ring db-ring-2" />
        <div className="db-ring db-ring-3" />
      </div>
    </div>
  );
}

/* ── API Boundary Box (cube) ─────────────────────────────────────────── */
export function ApiBoundaryBox({ className = '' }: { className?: string }) {
  return (
    <div className={`prim3d-wrap ${className}`} data-depth="0.6" aria-hidden="true">
      <div className="api-cube">
        <div className="cube-face cube-front">
          <code>POST</code><br /><span>/api</span>
        </div>
        <div className="cube-face cube-back">
          <code>201</code>
        </div>
        <div className="cube-face cube-right">
          <code>Zod</code>
        </div>
        <div className="cube-face cube-left">
          <code>JWT</code>
        </div>
        <div className="cube-face cube-top">
          <code>req</code>
        </div>
        <div className="cube-face cube-bottom">
          <code>res</code>
        </div>
      </div>
    </div>
  );
}

/* ── Code Bracket Frame ──────────────────────────────────────────────── */
export function CodeBracketFrame({ className = '' }: { className?: string }) {
  return (
    <div className={`prim3d-wrap ${className}`} data-depth="0.3" aria-hidden="true">
      <div className="bracket-frame">
        <div className="bracket-face bracket-front">
          <span className="br-open">{'{'}</span>
          <div className="br-lines">
            <span>type Schema</span>
            <span>  id: string</span>
            <span>  url: string</span>
            <span>  code: unique</span>
          </div>
          <span className="br-close">{'}'}</span>
        </div>
        <div className="bracket-face bracket-side-r" />
        <div className="bracket-face bracket-side-l" />
        <div className="bracket-face bracket-top" />
        <div className="bracket-face bracket-bottom" />
      </div>
    </div>
  );
}

/* ── Git Orbit Ring ──────────────────────────────────────────────────── */
export function GitOrbit({ className = '' }: { className?: string }) {
  return (
    <div className={`prim3d-wrap ${className}`} data-depth="0.5" aria-hidden="true">
      <div className="git-orbit">
        <div className="orbit-ring orbit-ring-1">
          <span className="orbit-commit oc-1" />
          <span className="orbit-commit oc-2" />
          <span className="orbit-commit oc-3" />
        </div>
        <div className="orbit-ring orbit-ring-2">
          <span className="orbit-commit oc-4" />
          <span className="orbit-commit oc-5" />
        </div>
        <div className="orbit-core">
          <code>main</code>
        </div>
      </div>
    </div>
  );
}

/* ── Network Node cluster ────────────────────────────────────────────── */
export function NetworkNode({ className = '' }: { className?: string }) {
  return (
    <div className={`prim3d-wrap ${className}`} data-depth="0.7" aria-hidden="true">
      <div className="net-cluster">
        <div className="net-node net-center"><span>API</span></div>
        <div className="net-spoke net-spoke-1" />
        <div className="net-spoke net-spoke-2" />
        <div className="net-spoke net-spoke-3" />
        <div className="net-spoke net-spoke-4" />
        <div className="net-sat net-sat-1"><code>DB</code></div>
        <div className="net-sat net-sat-2"><code>UI</code></div>
        <div className="net-sat net-sat-3"><code>CDN</code></div>
        <div className="net-sat net-sat-4"><code>Auth</code></div>
      </div>
    </div>
  );
}

/* ── Schema Card (floating Prisma schema) ────────────────────────────── */
export function SchemaCard({ className = '' }: { className?: string }) {
  return (
    <div className={`prim3d-wrap ${className}`} data-depth="0.45" aria-hidden="true">
      <div className="schema-card-3d">
        <div className="sc3d-face sc3d-front">
          <div className="sc3d-tab">schema.prisma</div>
          <pre className="sc3d-code">{`model Link {
  id        String  @id
  shortCode String  @unique
  url       String
  clicks    Int     @default(0)
  isActive  Boolean @default(true)
}`}</pre>
        </div>
        <div className="sc3d-face sc3d-back" />
        <div className="sc3d-face sc3d-right" />
        <div className="sc3d-face sc3d-left" />
        <div className="sc3d-face sc3d-top" />
        <div className="sc3d-face sc3d-bottom" />
      </div>
    </div>
  );
}

/* ── Hero 3D Scene (assembles all primitives) ────────────────────────── */
export function Hero3DScene() {
  return (
    <div className="hero3d-scene" aria-hidden="true">
      <DatabaseCylinder className="h3d-db" />
      <ApiBoundaryBox className="h3d-api" />
      <CodeBracketFrame className="h3d-bracket" />
      <GitOrbit className="h3d-git" />
      <NetworkNode className="h3d-net" />
      <SchemaCard className="h3d-schema" />
    </div>
  );
}
