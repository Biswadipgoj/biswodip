'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { stack } from '@/lib/data';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';

const buildStack: SceneBuilder = (tl, root, desktop) => {
  const layers = root.querySelectorAll<HTMLElement>('.stack-layer');
  const wireFill = root.querySelector<HTMLElement>('.stack-wire-fill');
  const track = root.querySelector<HTMLElement>('.stack-assembly-track');
  const indicators = root.querySelectorAll<HTMLElement>('.stack-stage-indicator');

  if (!track || layers.length === 0) return;

  // Initialize all layers with subtle depth
  gsap.set(layers, { opacity: 0.7, scale: 0.97 });
  if (layers[0]) gsap.set(layers[0], { opacity: 1, scale: 1 });
  if (indicators[0]) indicators[0].classList.add('is-active');

  if (wireFill) {
    gsap.set(wireFill, { scaleY: 0, transformOrigin: 'top' });
  }

  if (desktop) {
    // Calculate vertical travel distance so all 4 cards smoothly travel through the center
    // Track travels up so Card 01 -> Card 02 -> Card 03 -> Card 04 each take center stage
    const cardHeight = layers[0].offsetHeight || 220;
    const gap = 18;
    const stepDistance = cardHeight + gap;
    const totalTravel = stepDistance * (layers.length - 1);

    // Continuous smooth vertical translation scrub across the entire scene
    tl.to(track, {
      y: -totalTravel,
      ease: 'power1.inOut',
      duration: 1,
    }, 0);

    // Wire fill grows alongside scroll progress
    if (wireFill) {
      tl.to(wireFill, { scaleY: 1, ease: 'none', duration: 1 }, 0);
    }

    // Sequentially highlight and activate each card (01 -> 02 -> 03 -> 04)
    layers.forEach((layer, i) => {
      const startAt = Math.max(0, (i - 0.4) / (layers.length - 1));
      const peakAt = i / (layers.length - 1);
      const endAt = Math.min(1, (i + 0.4) / (layers.length - 1));

      // Active card scale and full opacity spotlight
      tl.to(layer, {
        opacity: 1,
        scale: 1.02,
        duration: 0.18,
        ease: 'power2.out',
        onStart: () => {
          layers.forEach(l => l.classList.remove('is-active'));
          layer.classList.add('is-active');
          indicators.forEach((ind, idx) => {
            if (idx === i) ind.classList.add('is-active');
            else ind.classList.remove('is-active');
          });
        },
      }, Math.max(0, peakAt - 0.08));

      // Dim passed cards slightly while preserving readability
      if (i < layers.length - 1) {
        tl.to(layer, {
          opacity: 0.65,
          scale: 0.98,
          duration: 0.15,
          ease: 'power2.in',
        }, Math.min(1, peakAt + 0.18));
      }
    });
  } else {
    // Mobile: smooth entrance stagger, full visibility
    tl.fromTo(
      layers,
      { opacity: 0.3, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
      0.05
    );
    if (wireFill) {
      tl.to(wireFill, { scaleY: 1, duration: 0.8, ease: 'none' }, 0);
    }
  }
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
      el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateZ(10px)`;
      el.style.transition = 'transform 60ms linear';
    };
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      el.style.transition = 'transform 500ms cubic-bezier(.22,1,.36,1)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return <article ref={ref} className={className} id={id} onClick={onClick}>{children}</article>;
}

export default function Stack() {
  const ref = useScene(buildStack);

  const scrollToLayer = (index: number) => {
    const root = ref.current;
    if (!root) return;
    const layers = root.querySelectorAll<HTMLElement>('.stack-layer');
    if (layers[index]) {
      layers[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="stack" ref={ref} className="scroll-chapter stack-section" data-environment="sky">
      <div className="chapter-viewport stack-viewport">
        <div className="stack-heading">
          <div className="stack-badge-row">
            <span className="small-label stack-pill-label">SYSTEM ARCHITECTURE</span>
            <span className="stack-status-pulse">4 Contracts Active</span>
          </div>
          <h2>Deterministic Contracts.<br /><em className="stack-heading-em">Zero Leakage.</em></h2>
          <p>
            Trace an end-to-end transaction from client ingress through boundary validation, relational persistence, and edge resolution — zero unhandled exceptions, zero data loss.
          </p>

          {/* Interactive stage quick-nav tabs */}
          <div className="stack-stages-nav" role="tablist" aria-label="Architecture Stages">
            {stack.map((layer, idx) => (
              <button
                key={layer.id}
                type="button"
                className={`stack-stage-indicator indicator-${idx}`}
                onClick={() => scrollToLayer(idx)}
                aria-label={`Jump to stage 0${idx + 1}: ${layer.title}`}
              >
                <span className="indicator-num">0{idx + 1}</span>
                <span className="indicator-name">{layer.title.split('&')[0].trim()}</span>
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
            <span className="verification-label">Verification Pipeline</span>
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
                onClick={() => scrollToLayer(i)}
              >
                <div className="stack-layer-glass-highlight" aria-hidden="true" />
                <div className="stack-layer-heading">
                  <span className="layer-index">0{i + 1}</span>
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

