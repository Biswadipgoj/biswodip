'use client';
import Image from 'next/image';
import { gsap } from 'gsap';
import type { Project } from '@/lib/data';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { CodeWindow, FlowLine, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';

// Contiguous excerpt, app/api/payments/submit/route.ts (public source).
const paymentCode = [
  'const { data: retailer } = await svc',
  "  .from('retailers')",
  "  .select('id, retail_pin, is_active')",
  "  .eq('auth_user_id', user.id)",
  '  .single();',
  '',
  '// Assert principal authorization & active collection privileges',
  'if (!retailer?.is_active) {',
  "  return new NextResponse('Unauthorized Principal', { status: 403 });",
  '}',
];

const buildTelePoint: SceneBuilder = (tl, root, desktop) => {
  gsap.set(root.querySelectorAll('.tele-decomposition, .tele-code, .tele-system, .tele-return'), { autoAlpha: 0 });
  tl.fromTo('.tele-cover', { scale: 0.87 }, { scale: 1, duration: 0.14 }, 0)
    .to('.tele-cover', { scale: 1.12, autoAlpha: 0, duration: 0.075 }, 0.16)
    .to('.tele-decomposition', { autoAlpha: 1, duration: 0.03 }, 0.22)
    .fromTo('.tele-fragment', { y: 40, rotate: 0, scale: 0.93 }, { y: 0, rotate: (i: number) => desktop ? (i - 1) * 4 : 0, scale: 1, stagger: 0.03, duration: 0.06 }, 0.23)
    .to('.tele-decomposition', { y: -40, autoAlpha: 0, duration: 0.05 }, 0.4)
    .to('.tele-code', { autoAlpha: 1, duration: 0.05 }, 0.44)
    .fromTo('.tele-code .code-line', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)', duration: 0.035, stagger: 0.02 }, 0.46)
    .to('.tele-code', { scale: 0.9, autoAlpha: 0, duration: 0.06 }, 0.6)
    .to('.tele-system', { autoAlpha: 1, duration: 0.035 }, 0.65)
    .fromTo('.tele-system .flow-node', { y: 30, scale: 0.92, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, stagger: 0.025, duration: 0.05 }, 0.66)
    .fromTo('.tele-system .flow-pulse', { xPercent: -100 }, { xPercent: 700, stagger: 0.018, duration: 0.13 }, 0.7)
    .fromTo('.tele-tech-line span', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.02, duration: 0.05 }, 0.75)
    .to('.tele-system', { autoAlpha: 0, scale: 0.92, duration: 0.06 }, 0.86)
    .fromTo('.tele-return', { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, duration: 0.1 }, 0.89);
};

export default function TelePointScene({ project }: { project: Project }) {
  const ref = useScene(buildTelePoint);
  return (
    <section ref={ref} className="scroll-chapter tele-scene" aria-label="Inside TelePoint Architecture">
      <div className="chapter-viewport product-viewport">
        <div className="scene-stage tele-cover" data-range="0,0.24">
          <ProjectMedia project={project} />
          <p className="scene-caption">Production financial EMI portal with role-isolated boundaries.</p>
        </div>
        <div className="scene-stage tele-decomposition" data-range="0.22,0.43">
          <h4>Multi-Principal Isolation.<br /><em>Zero Cross-Tenant Leakage.</em></h4>
          <div className="tele-fragments">
            {[
              { name: 'Admin Boundary', position: 'top', note: 'Account provisioning & portfolio oversight' },
              { name: 'Agent Interface', position: 'middle', note: 'Idempotent installment collections' },
              { name: 'Customer Ledger', position: 'bottom', note: 'Amortization schedule & receipt audit' }
            ].map((part, i) => (
              <figure className={`tele-fragment tele-fragment-${i}`} key={part.name}>
                <div className={`interface-crop crop-${part.position}`}>
                  <Image src={project.previewImage} alt={`TelePoint ${part.name.toLowerCase()} view`} fill sizes="(max-width: 799px) 85vw, 32vw" />
                </div>
                <figcaption>
                  <strong>{part.name}</strong>
                  <span>{part.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="scene-stage tele-code" data-range="0.43,0.65">
          <div className="scene-subheading">
            <h4>Server-Side Principal Check.<br /><em>Defense in Depth.</em></h4>
            <p>Session-bound principal verification prior to financial record mutations.</p>
          </div>
          <CodeWindow lines={paymentCode} file="api/payments/submit/route.ts" label="Production Verification · TelePoint" />
        </div>
        <div className="scene-stage tele-system" data-range="0.64,0.90">
          <h4>Idempotent State Transitions.<br /><em>Reconciled Ledger Invariants.</em></h4>
          <FlowLine steps={project.chapter.flow} />
          <div className="tele-tech-line">
            <span><strong>Ingress Layer</strong>TypeScript 5 / React 18</span>
            <span><strong>Boundary Layer</strong>Next.js Route Handlers (Auth Session)</span>
            <span><strong>Persistence Engine</strong>Supabase / PostgreSQL (ACID TX)</span>
          </div>
          <p className="scene-caption">Deterministic installment state machine: Pending → Due → Overdue → Cleared.</p>
        </div>
        <div className="scene-stage tele-return" data-range="0.89,1.01">
          <ProjectMedia project={project} />
          <p className="scene-caption">Live production deployment on Vercel with automated reconciliation.</p>
        </div>
      </div>
    </section>
  );
}

