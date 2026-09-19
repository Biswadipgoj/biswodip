'use client';
import { useState } from 'react';
import { gsap } from 'gsap';
import { nanoCode, nanoFields, type Project } from '@/lib/data';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { CodeWindow, FlowLine, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const buildNano: SceneBuilder = (tl, root, desktop) => {
  gsap.set(root.querySelectorAll('.nano-machine, .nano-source, .nano-database, .nano-return'), { autoAlpha: 0 });
  tl.fromTo('.nano-cover', { scale: 0.87, y: 22 }, { scale: 1, y: 0, duration: 0.15 }, 0)
    .to('.nano-cover', { scale: 1.12, y: -30, autoAlpha: 0, duration: 0.08 }, 0.16)
    .to('.nano-machine', { autoAlpha: 1, duration: 0.04 }, 0.22)
    .fromTo('.url-track', { xPercent: -12 }, { xPercent: 0, duration: 0.065 }, 0.24);
  const chars = root.querySelectorAll('.url-char');
  chars.forEach((char, i) => {
    tl.to(char, { x: (chars.length / 2 - i) * (desktop ? 14 : 6), scaleX: 0.15, autoAlpha: 0, duration: 0.085 }, 0.29 + i * 0.0005);
  });
  tl.fromTo('.short-url', { scale: 0.82, y: 24, autoAlpha: 0 }, { scale: 1, y: 0, autoAlpha: 1, duration: 0.09 }, 0.35)
    .fromTo('.nano-machine .flow-node', { opacity: 0.25, y: 12 }, { opacity: 1, y: 0, stagger: 0.025, duration: 0.04 }, 0.27)
    .to('.nano-machine', { autoAlpha: 0, y: -30, duration: 0.05 }, 0.46)
    .to('.nano-source', { autoAlpha: 1, duration: 0.04 }, 0.5)
    .fromTo('.nano-source .code-line', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', stagger: 0.011, duration: 0.015 }, 0.51)
    .to('.nano-source', { scale: 0.93, y: -30, autoAlpha: 0, duration: 0.07 }, 0.66)
    .to('.nano-database', { autoAlpha: 1, duration: 0.05 }, 0.71)
    .fromTo('.schema-record', { x: 28, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.01, duration: 0.04 }, 0.72)
    .to('.nano-database', { y: 30, autoAlpha: 0, duration: 0.05 }, 0.86)
    .fromTo('.nano-return', { scale: 0.75, autoAlpha: 0, rotateX: desktop ? 12 : 0 }, { scale: 1, autoAlpha: 1, rotateX: 0, duration: 0.095 }, 0.89);
};

const featureExamples = [
  {
    label: 'Cryptographic Auth',
    code: 'password: hashedPassword // bcrypt (10 rounds)',
    title: 'Bcrypt Hash Verification',
    body: 'Protects sensitive redirects with bcrypt-hashed credentials. The route performs constant-time password verification prior to emitting redirect headers, mitigating brute-force attacks.',
    state: 'Hash verification → 403 Forbidden / 302 Redirect',
  },
  {
    label: 'Temporal TTL',
    code: 'expiresAt: DateTime? // indexed check',
    title: 'Deterministic Temporal Invalidation (TTL)',
    body: 'Time-to-live boundaries enforced at redirect evaluation. Once current timestamp exceeds the indexed expiresAt value, the engine short-circuits to HTTP 410 Gone without downstream origin resolution.',
    state: 'now() > expiresAt → HTTP 410 Gone',
  },
  {
    label: 'Atomic Token Burn',
    code: 'oneTimeUse: true // atomic CAS flip',
    title: 'Atomic Single-Use Ephemeral Tokens',
    body: 'Single-read secrecy via atomic compare-and-swap updates. On first resolution, isActive is flipped to false within the transaction. Subsequent requests fail instantly, preventing token replay attacks.',
    state: 'SELECT FOR UPDATE → isActive = false',
  },
  {
    label: 'B-Tree Indexing',
    code: 'customAlias: String? @unique',
    title: 'O(1) Collision-Resistant Alias Ingress',
    body: 'Custom routing paths validated against strict URL-safe regex specifications. Backed by a unique B-tree index in PostgreSQL guaranteeing O(1) existence verification and strict uniqueness constraints.',
    state: 'O(1) B-Tree Index Lookup → Ingress Route',
  },
  {
    label: 'Atomic Telemetry',
    code: 'clicks: Int (increment) · lastVisited: DateTime',
    title: 'Atomic High-Throughput Click Telemetry',
    body: 'Records link access frequency and timestamp telemetry in a single atomic database write, eliminating read-modify-write race conditions under concurrent traffic spikes.',
    state: 'UPDATE link SET clicks = clicks + 1, lastVisited = NOW()',
  },
];

export function NanoFeatures() {
  const [active, setActive] = useState(0);
  const feature = featureExamples[active];
  return (
    <div className="nano-features">
      <div className="feature-tabs" role="tablist" aria-label="NanoLink architectural features">
        {featureExamples.map((item, i) => (
          <Button
            key={item.label}
            variant="ghost"
            role="tab"
            id={`nano-tab-${i}`}
            aria-selected={active === i}
            aria-controls="nano-feature-panel"
            tabIndex={active === i ? 0 : -1}
            className="feature-tab"
            onClick={() => setActive(i)}
            onKeyDown={event => {
              const index = event.key === 'ArrowRight' ? (i + 1) % featureExamples.length : event.key === 'ArrowLeft' ? (i + featureExamples.length - 1) % featureExamples.length : event.key === 'Home' ? 0 : event.key === 'End' ? featureExamples.length - 1 : undefined;
              if (index !== undefined) { event.preventDefault(); setActive(index); document.getElementById(`nano-tab-${index}`)?.focus(); }
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="feature-panel" id="nano-feature-panel" role="tabpanel" aria-labelledby={`nano-tab-${active}`} tabIndex={0}>
        <div>
          <h4>{feature.title}</h4>
          <p>{feature.body}</p>
        </div>
        <div className={`feature-state feature-state-${active}`}>
          <span>Production Invariant State</span>
          <strong>{feature.state}</strong>
          <code>{feature.code}</code>
        </div>
      </div>
    </div>
  );
}

export default function NanoLinkScene({ project }: { project: Project }) {
  const ref = useScene(buildNano);
  const url = 'https://enterprise.internal.infra.service/v2/telemetry/reports/daily?auth=token';
  return (
    <>
      <section ref={ref} className="scroll-chapter nano-scene" aria-label="Inside NanoLink Architecture">
        <div className="chapter-viewport product-viewport">
          <div className="scene-stage nano-cover" data-range="0,0.23">
            <ProjectMedia project={project} />
            <span className="scene-caption">High-throughput short-code hashing engine and redirect resolver.</span>
          </div>
          <div className="scene-stage nano-machine" data-range="0.23,0.48">
            <h4>Collision-Resistant Hashing.<br /><em>Deterministic Resolution.</em></h4>
            <div className="url-track">
              <div className="long-url" aria-label={url}>
                {[...url].map((char, i) => <span key={i} className="url-char" aria-hidden="true">{char}</span>)}
              </div>
              <div className="short-url">nanl.vercel.app/<strong>metrics</strong></div>
            </div>
            <FlowLine steps={['Zod Ingress', 'Bcrypt Derivation', 'Prisma Transaction', 'O(1) Edge Resolution']} />
            <p className="scene-caption">End-to-end request lifecycle through boundary validation to redirect emission</p>
          </div>
          <div className="scene-stage nano-source" data-range="0.49,0.70">
            <div className="scene-subheading">
              <h4>Atomic Transaction Engine.<br /><em>Zero Partial Writes.</em></h4>
              <p>Zod schema validation followed by single-transaction persistence.</p>
            </div>
            <CodeWindow lines={nanoCode} file="api/links/route.ts" label="Production Route Handler · NanoLink" />
          </div>
          <div className="scene-stage nano-database" data-range="0.70,0.90">
            <div className="database-explanation">
              <h4>Normalized Schema.<br /><em>B-Tree Indexing.</em></h4>
              <p>Unique constraints on primary lookups with referential foreign key integrity.</p>
              <div className="database-technologies">
                <span>Next.js 15<span>Ingress Gateway</span></span>
                <span>Prisma ORM<span>Relational Layer</span></span>
                <span>PostgreSQL<span>ACID Persistence</span></span>
              </div>
              <a className="text-link" href={project.evidence[1].url} target="_blank" rel="noopener noreferrer">Inspect PostgreSQL Schema</a>
            </div>
            <div className="schema-sheet">
              <div className="schema-heading">
                <strong>Link Entity</strong>
                <span>Relational Schema Definition</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Relational Type &amp; Constraint</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nanoFields.map(([name, type]) => (
                    <TableRow className="schema-record" key={name}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="scene-stage nano-return" data-range="0.88,1.01">
            <ProjectMedia project={project} />
            <p className="scene-caption">Live production application deployed on Vercel Edge.</p>
          </div>
        </div>
      </section>
      <NanoFeatures />
    </>
  );
}

