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
  tl.to('.hero-intro', { y: -70, autoAlpha: 0, duration: 0.12 }, 0.08)
    .to('.hero-portrait-fragment', { y: -40, rotate: 4, autoAlpha: 0, duration: 0.12 }, 0.08)
    .to('.hero-image-fragment', { y: 90, rotate: 0, autoAlpha: 0, duration: 0.12 }, 0.08)
    .fromTo('.hero-editor', { yPercent: desktop ? 54 : 46, scale: desktop ? 0.86 : 0.96, rotateX: desktop ? 7 : 0 }, { yPercent: desktop ? -6 : -4, scale: 1, rotateX: 0, duration: 0.18 }, 0.10)
    .to('.hero-stage-title', { autoAlpha: 1, y: 0, duration: 0.08 }, 0.22);
  root.querySelectorAll('.hero-editor .code-line').forEach((line, index) => {
    const at = 0.24 + index * 0.035;
    if (index > 0) tl.to(line, { clipPath: 'inset(0 0% 0 0)', duration: 0.032 }, at);
    tl.fromTo(line.querySelector('.code-cursor'), { opacity: 1 }, { opacity: 0, duration: 0.003, immediateRender: false }, at + 0.03);
  });
  tl.to('.hero-pipeline', { autoAlpha: 1, duration: 0.04 }, 0.49)
    .fromTo('.hero-pipeline .build-step', { opacity: 0.25, y: 8 }, { opacity: 1, y: 0, stagger: 0.021, duration: 0.03 }, 0.5)
    .to('.hero-build-caption', { autoAlpha: 1, duration: 0.04 }, 0.62)
    .to('.hero-editor', { scale: 0.88, rotateX: desktop ? 18 : 0, y: -35, autoAlpha: 0, duration: 0.09 }, 0.68)
    .to('.hero-stage-title, .hero-pipeline, .hero-build-caption', { autoAlpha: 0, duration: 0.07 }, 0.69)
    .to('.hero-architecture', { autoAlpha: 1, duration: 0.03 }, 0.73)
    .fromTo('.architecture-sheet', { y: 70, rotateX: desktop ? 24 : 0, scale: 0.92, autoAlpha: 0 }, { y: 0, rotateX: 0, scale: 1, autoAlpha: 1, stagger: 0.035, duration: 0.065 }, 0.74)
    .fromTo('.architecture-sheet .attached-tech', { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.025, duration: 0.05 }, 0.81)
    .to('.hero-progress-fill', { scaleX: 1, duration: 1 }, 0);
};

export default function Opening() {
  const ref = useScene(buildOpening);
  return <section id="opening" ref={ref} className="scroll-chapter opening" data-environment="butter" aria-label="Software, from the inside out">
    <div className="chapter-viewport">
      <div className="hero-intro">
        <div className="hero-byline"><span>{personal.name}</span><span>{personal.role}</span></div>
        <h1>Software,<br /><em>from the inside out.</em></h1>
        <div className="hero-intro-bottom"><p>Interfaces. APIs. Data.<br />From the first idea to the live product.</p><a className="text-link skip-work" href="#projects">Skip to work<ArrowUpRightIcon aria-hidden="true" /></a></div>
      </div>
      <figure className="hero-portrait-fragment"><Image src="/biswodip.png" alt="Biswodip Goj" fill priority sizes="(max-width: 799px) 84px, 160px" /><figcaption>Based in West Bengal, India</figcaption></figure>
      <div className="hero-image-fragment fragment-one" aria-hidden="true"><Image src="/previews/nexora.webp" alt="" fill sizes="(max-width: 799px) 180px, 380px" /></div>
      <div className="hero-image-fragment fragment-two" aria-hidden="true"><Image src="/previews/nanolink.webp" alt="" fill sizes="(max-width: 799px) 180px, 400px" /></div>
      <div className="hero-stage-title"><h2>Start with an idea.<br /><em>Give it structure.</em></h2></div>
      <CodeWindow className="hero-editor" lines={heroCode} file="build.ts" label="Illustrative software flow" />
      <BuildPipeline className="hero-pipeline" />
      <p className="hero-build-caption">Build ready. Now look inside.</p>
      <div className="hero-architecture">
        <h2>Code becomes<br /><em>a connected system.</em></h2>
        <div className="architecture-sheets">{stack.map((layer, index) => <div className={`architecture-sheet sheet-${index}`} key={layer.id}><span className="layer-index">0{index + 1}</span><strong>{layer.title}</strong><span className="attached-tech">{layer.tools.slice(0, 2).join(' / ')}</span></div>)}</div>
        <p>And behind the system, a person.</p>
      </div>
      <div className="hero-scroll-note"><span>Scroll to build</span><ArrowDownIcon aria-hidden="true" /><div className="hero-progress"><span className="hero-progress-fill" /></div><span>Code → system → product</span></div>
    </div>
  </section>;
}
