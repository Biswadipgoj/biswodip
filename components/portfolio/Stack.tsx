'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { stack } from '@/lib/data';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';

const buildStack: SceneBuilder = (tl, root, desktop) => {
  const layers = root.querySelectorAll<HTMLElement>('.stack-layer');
  const wireFill = root.querySelector<HTMLElement>('.stack-wire-fill');
  const indicators = root.querySelectorAll<HTMLElement>('.stack-stage-indicator');

  if (layers.length === 0) return;

  const compact = !desktop || window.innerHeight < 880;
  root.dataset.compact = String(compact);

  if (wireFill) {
    gsap.set(wireFill, { scaleY: 0, transformOrigin: 'top' });
    tl.to(wireFill, { scaleY: 1, duration: 0.9, ease: 'none' }, 0.03);
  }

  if (compact) {
    gsap.set(layers, { autoAlpha: 0, y: 30 });
    layers.forEach((layer, i) => {
      const r = 0.24 * i;
      tl.to(layer, {
        autoAlpha: 1,
        y: 0,
        duration: 0.07,
      }, r)
      .fromTo(layer.querySelectorAll('.stack-tool'), 
        { clipPath: 'inset(0 100% 0 0)' }, 
        { clipPath: 'inset(0 0% 0 0)', stagger: 0.017, duration: 0.04 }, 
        r + 0.02
      );
      if (i < layers.length - 1) {
        tl.to(layer, { autoAlpha: 0, y: -25, duration: 0.05 }, r + 0.20);
      }
    });
  } else {
    layers.forEach((layer, s) => {
      tl.fromTo(layer, 
        { x: desktop ? (s % 2 ? 80 : -80) : 28, y: 25 * s, opacity: 0.25, rotateX: 10 }, 
        { x: 0, y: 0, opacity: 1, rotateX: 0, duration: 0.2 }, 
        0.19 * s
      )
      .fromTo(layer.querySelectorAll('.stack-tool'), 
        { clipPath: 'inset(0 100% 0 0)' }, 
        { clipPath: 'inset(0 0% 0 0)', stagger: 0.03, duration: 0.1 }, 
        0.19 * s + 0.06
      );
    });
  }

  // Bidirectional active layer synchronization
  tl.eventCallback('onUpdate', () => {
    const progress = tl.progress();
    const activeIndex = Math.min(layers.length - 1, Math.max(0, Math.floor(progress * layers.length)));
    indicators.forEach((ind, idx) => {
      ind.classList.toggle('is-active', idx === activeIndex);
    });
    layers.forEach((layer, idx) => {
      layer.classList.toggle('is-active', idx === activeIndex);
    });
  });
};

/** Per-card 3D perspective tilt on hover — applied to each stack-layer card */
function TiltCard({ children, className, id, onClick }: { children: React.ReactNode; className?: string; id?: string; onClick?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateZ(6px)`;
      el.style.transition = 'transform 60ms linear';
    };
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      el.style.transition = 'transform 400ms cubic-bezier(.22,1,.36,1)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return <article ref={ref} className={className} id={id} onClick={onClick}>{children}</article>;
}

export default function Stack() {
  const ref = useScene(buildStack);

  const selectLayer = (index: number) => {
    const root = ref.current;
    if (!root) return;
    const layers = root.querySelectorAll<HTMLElement>('.stack-layer');
    const indicators = root.querySelectorAll<HTMLElement>('.stack-stage-indicator');
    
    indicators.forEach((ind, i) => ind.classList.toggle('is-active', i === index));
    layers.forEach((layer, i) => {
      layer.classList.toggle('is-active', i === index);
      if (root.dataset.compact === 'true') {
        gsap.to(layer, { autoAlpha: i === index ? 1 : 0, y: i === index ? 0 : 25, duration: 0.25, overwrite: 'auto' });
      }
    });

    if (root.dataset.compact !== 'true' && layers[index]) {
      layers[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="stack" ref={ref} className="scroll-chapter stack-section" data-environment="sky">
      <div className="chapter-viewport stack-viewport">
        <div className="stack-heading">
          <span className="stack-eyebrow">SYSTEM ARCHITECTURE · 4 DETERMINISTIC CONTRACTS</span>
          <h2>Deterministic Contracts.<br />Zero Leakage.</h2>
          <p>
            Trace an end-to-end transaction from client ingress through boundary validation, relational persistence, and edge resolution — zero unhandled exceptions, zero data loss.
          </p>
          <p className="stack-ownership-statement">
            Full architectural ownership from database kernel to client viewport.
          </p>

          {/* Interactive stage quick-nav tabs */}
          <div className="stack-stages-nav" role="tablist" aria-label="Architecture Stages">
            {stack.map((layer, idx) => (
              <button
                key={layer.id}
                type="button"
                className={`stack-stage-indicator indicator-${idx} ${idx === 0 ? 'is-active' : ''}`}
                onClick={() => selectLayer(idx)}
                aria-label={`Jump to stage 0${idx + 1}: ${layer.title}`}
              >
                <span className="indicator-num">0{idx + 1}</span>
                <span className="indicator-name">{layer.title}</span>
                <span className="indicator-tech">{layer.subtitle}</span>
              </button>
            ))}
          </div>

          <div className="stack-contract">
            <div className="contract-header-row">
              <span>Pipeline Ingress</span>
              <span className="contract-status-tag">HTTP 201 Created</span>
            </div>
            <code>POST /api/links</code>
            <span>Zod · Bcrypt · Prisma TX → 201 Response</span>
          </div>

          <a className="text-link stack-inspect-link" href="#nanolink">
            Inspect Architecture Implementation<ArrowDownIcon aria-hidden="true" />
          </a>

          <div className="stack-verification">
            <span className="verification-label">Delivery & Verification</span>
            <p>
              Strict TypeScript 5 compilation. Static ESLint analysis. Production releases gated by automated Playwright E2E integration suites against live containerized PostgreSQL instances.
            </p>
          </div>
        </div>

        <div className="stack-assembly">
          <div className="stack-wire"><span className="stack-wire-fill" /></div>
          <div className="stack-assembly-track">
            {stack.map((layer, i) => (
              <TiltCard
                key={layer.id}
                className={`stack-layer stack-layer-${i} ${i === 0 ? 'is-active' : ''}`}
                id={layer.id === 'application' ? 'api' : undefined}
                onClick={() => selectLayer(i)}
              >
                <div className="stack-layer-heading">
                  <div className="layer-badge-row">
                    <span className="layer-index">0{i + 1}</span>
                    <span className="layer-contract-pill">{layer.subtitle}</span>
                  </div>
                  <h3>{layer.title}</h3>
                  <span className="layer-badge">{layer.description}</span>
                </div>
                <div className="stack-tools">
                  {layer.tools.map(tool => (
                    <span className="stack-tool" key={tool}>{tool}</span>
                  ))}
                </div>
                <p className="stack-layer-detail">{layer.detail}</p>
                <div className="stack-layer-foot">
                  <code>{layer.sample}</code>
                  <a
                    href={layer.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${layer.evidence} source on GitHub`}
                    onClick={e => e.stopPropagation()}
                  >
                    {layer.evidence}<ArrowUpRightIcon aria-hidden="true" />
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

