'use client';
import Link from 'next/link';
import { hero, personal, projects } from '@/lib/data';
import { ActionLink, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';

const build: SceneBuilder = (timeline, root) => {
  const select = (selector: string) => root.querySelector(selector);
  timeline.to(select('.hero-copy'), { y: -45, opacity: 1, duration: 1 }, 0)
    .to(select('.hero-main-image'), { xPercent: -9, y: -30, rotation: 0, rotationX: 0, rotationY: 0, z: 60, scale: 1.1, duration: 1 }, 0)
    .to(select('.hero-small-image'), { xPercent: 9, y: -120, rotation: 0, rotationX: -4, rotationY: -6, z: 90, duration: 1 }, 0)
    .to(select('.hero-mini-label'), { y: -65, duration: 1 }, 0)
    .to(select('.hero-grid'), { y: 80, scale: 1.1, duration: 1 }, 0);
};

export default function Opening() {
  const ref = useScene(build);
  return <section id="opening" ref={ref} className="opening" aria-labelledby="hero-title" data-motion-root>
    <div className="hero-stage">
      <div className="hero-grid" aria-hidden="true" />
      <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '8%', right: '12%', width: 440, height: 440, background: 'radial-gradient(circle, rgba(147, 199, 179, 0.6), transparent 70%)' }} aria-hidden="true" />
      <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '12%', left: '5%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(232, 166, 124, 0.52), transparent 70%)' }} aria-hidden="true" />
      <div className="hero-orbit-badges" aria-hidden="true">
        <span className="hero-orbit-chip chip-left" data-parallax="40" data-plane="1">{hero.proofStrip[0].label}</span>
        <span className="hero-orbit-chip chip-right" data-parallax="-30" data-plane="-1">{hero.workflow[1]}</span>
        <span className="hero-orbit-chip chip-center" data-parallax="28" data-plane="1">B.Tech CSE · 2024</span>
      </div>
      <div className="hero-copy">
        <p className="hero-eyebrow"><span className="status-dot"/>{hero.eyebrow} · {personal.name}</p>
        <h1 id="hero-title" aria-label={hero.heading}><AnimatedText>{hero.heading}</AnimatedText></h1>
        <p className="hero-body">{hero.body}</p>
        <div className="hero-proof-strip" aria-label="Key qualifications">
          {hero.proofStrip.map((item) => (
            <div key={item.label} className="proof-item">
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <ActionLink href="#projects">{hero.primary}</ActionLink>
          <a href={personal.resume} download className="action action-quiet">Resume<ArrowDownIcon aria-hidden="true"/></a>
          <a href="https://github.com/Biswadipgoj" target="_blank" rel="noopener noreferrer" className="text-link">GitHub<ArrowUpRightIcon aria-hidden="true"/></a>
        </div>
      </div>
      <div className="hero-gallery" data-hero-gallery aria-label="A preview of my software projects">
        <Link href="/project/nanolink" prefetch={false} className="hero-main-image"><ProjectMedia project={projects[1]} priority/></Link>
        <Link href="/project/tripmate" prefetch={false} className="hero-small-image"><ProjectMedia project={projects[4]} priority/></Link>
        <div className="hero-mini-label glass-panel" data-spatial="card"><span>From requirements</span><span className="hero-label-line"/><strong>to production software.</strong><ArrowUpRightIcon aria-hidden="true"/></div>
      </div>
      <ol className="hero-workflow" aria-label={hero.workflowTitle} data-spatial="stagger-3d">{hero.workflow.map((step)=><li key={step}>{step}</li>)}</ol>
      <div className="hero-bottom"><span>TypeScript · React · Next.js · PostgreSQL · Python</span><a href="#about" className="scroll-hint">Scroll to explore<ArrowDownIcon aria-hidden="true"/></a><span>60+ Shipped · Production Systems</span></div>
    </div>
  </section>;
}
