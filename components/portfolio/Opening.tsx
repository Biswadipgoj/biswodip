'use client';
import Image from 'next/image';
import { gsap } from 'gsap';
import { heroCode, personal, stack } from '@/lib/data';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { BuildPipeline, CodeWindow } from '@/components/cinematic/SoftwarePrimitives';

const buildOpening: SceneBuilder = (tl, root, desktop) => {
  gsap.set(root.querySelectorAll('.hero-architecture, .hero-build-caption, .hero-stage-title, .hero-pipeline'), { autoAlpha: 0 });
  gsap.set(root.querySelectorAll('.hero-editor .code-line'), { clipPath: 'inset(0 100% 0 0)' });
  gsap.set(root.querySelector('.hero-editor .code-line'), { clipPath: 'inset(0 0% 0 0)' });

  // Smooth 120fps scrolling zoom & transitions
  tl.to('.hero-intro', { y: -70, autoAlpha: 0, duration: 0.12, ease: 'power2.inOut' }, 0.08)
    .to('.hero-portrait-fragment', { y: -40, rotate: 4, autoAlpha: 0, duration: 0.12 }, 0.08)
    .to('.hero-image-fragment', { y: 90, rotate: 0, autoAlpha: 0, duration: 0.12 }, 0.08)
    .fromTo('.hero-editor', 
      { yPercent: desktop ? 52 : 42, scale: desktop ? 0.86 : 0.94, rotateX: desktop ? 7 : 0 }, 
      { yPercent: desktop ? -5 : -3, scale: 1.02, rotateX: 0, duration: 0.22, ease: 'power2.out' }, 
      0.10
    )
    .to('.hero-stage-title', { autoAlpha: 1, y: 0, duration: 0.08 }, 0.20);

  root.querySelectorAll('.hero-editor .code-line').forEach((line, index) => {
    const at = 0.23 + index * 0.038;
    if (index > 0) tl.to(line, { clipPath: 'inset(0 0% 0 0)', duration: 0.035 }, at);
    tl.fromTo(line.querySelector('.code-cursor'), { opacity: 1 }, { opacity: 0, duration: 0.003, immediateRender: false }, at + 0.03);
  });

  tl.to('.hero-pipeline', { autoAlpha: 1, duration: 0.04 }, 0.49)
    .fromTo('.hero-pipeline .build-step', { opacity: 0.25, y: 8 }, { opacity: 1, y: 0, stagger: 0.021, duration: 0.03 }, 0.5)
    .to('.hero-build-caption', { autoAlpha: 1, duration: 0.04 }, 0.62)
    .to('.hero-editor', { scale: 0.90, rotateX: desktop ? 14 : 0, y: -30, autoAlpha: 0, duration: 0.10, ease: 'power2.in' }, 0.68)
    .to('.hero-stage-title, .hero-pipeline, .hero-build-caption', { autoAlpha: 0, duration: 0.07 }, 0.69)
    .to('.hero-architecture', { autoAlpha: 1, duration: 0.04 }, 0.72)
    .fromTo('.architecture-sheet', 
      { y: 60, scale: 0.92, rotateX: desktop ? 16 : 0, autoAlpha: 0 }, 
      { y: 0, scale: 1, rotateX: 0, autoAlpha: 1, stagger: 0.04, duration: 0.08, ease: 'power2.out' }, 
      0.73
    )
    .fromTo('.architecture-sheet .attached-tech', { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.025, duration: 0.05 }, 0.81)
    .to('.hero-progress-fill', { scaleX: 1, duration: 1 }, 0);
};

export default function Opening() {
  const ref = useScene(buildOpening);
  return (
    <section id="opening" ref={ref} className="scroll-chapter opening" data-environment="butter" aria-label="Software, from the inside out">
      <div className="chapter-viewport">
        <div className="hero-intro">
          <div className="hero-byline">
            <span>{personal.name}</span>
            <span>{personal.role} · 60+ Projects Engineered</span>
          </div>
          <h1>Interface. <em>API. Data.</em><br />End to end.</h1>
          <div className="hero-intro-bottom">
            <p>Typed Invariants. Resilient Ingress. ACID Relational Schemas.<br />Production Web, Cross-Platform Android & Machine Learning Pipelines.</p>
            <a className="text-link skip-work" href="#projects">Explore 60+ projects<ArrowUpRightIcon aria-hidden="true" /></a>
          </div>
        </div>
        <figure className="hero-portrait-fragment">
          <Image src="/biswodip.png" alt="Biswodip Goj" fill priority sizes="(max-width: 799px) 84px, 160px" />
          <figcaption>{personal.location}</figcaption>
        </figure>
        <div className="hero-image-fragment fragment-one" aria-hidden="true">
          <Image src="/previews/nexora.webp" alt="" fill sizes="(max-width: 799px) 180px, 380px" />
        </div>
        <div className="hero-image-fragment fragment-two" aria-hidden="true">
          <Image src="/previews/nanolink.webp" alt="" fill sizes="(max-width: 799px) 180px, 400px" />
        </div>
        <div className="hero-stage-title">
          <h2>Deterministic Pipeline.<br /><em>Every layer has a verified contract.</em></h2>
        </div>
        <CodeWindow className="hero-editor" lines={heroCode} file="pipeline.ts" label="System Architecture Pipeline Contract" />
        <BuildPipeline className="hero-pipeline" />
        <p className="hero-build-caption">Strict type safety. Invariants satisfied. CI/CD verified.</p>
        <div className="hero-architecture">
          <h2>Deterministic Contracts. <em>Zero Leakage.</em></h2>
          <div className="architecture-sheets">
            {stack.map((layer, index) => (
              <div className={`architecture-sheet sheet-${index}`} key={layer.id}>
                <span className="layer-index">0{index + 1}</span>
                <strong>{layer.title}</strong>
                <span className="attached-tech">{layer.subtitle}</span>
              </div>
            ))}
          </div>
          <p>Full architectural ownership from database kernel to client viewport.</p>
        </div>
        <div className="hero-scroll-note">
          <span>Scroll through architecture</span><ArrowDownIcon aria-hidden="true" />
          <div className="hero-progress"><span className="hero-progress-fill" /></div>
          <span>Schema &rarr; Ingress &rarr; Client</span>
        </div>
      </div>
    </section>
  );
}

