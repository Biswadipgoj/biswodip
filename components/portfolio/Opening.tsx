'use client';
import { hero, personal, socials } from '@/lib/data';
import { ActionLink } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { useEntrance } from '@/components/cinematic/useEntrance';
import CreativeStudio from '@/components/portfolio/CreativeStudio';

const build: SceneBuilder = (timeline, root, desktop) => {
  const select = (selector: string) => root.querySelector<HTMLElement>(selector);
  const selectAll = (selector: string) => [...root.querySelectorAll<HTMLElement>(selector)];
  const heroCopy = select('.hero-copy');
  const mainImage = select('.hero-main-image');
  const heroGrid = select('.hero-grid');
  const substrate = select('.architecture-substrate');
  const stageCards = selectAll('.stage-card');
  const proofItems = selectAll('.proof-item');
  const workflowItems = selectAll('.hero-workflow li');
  const orbs = selectAll('.spatial-ambient-orb');

  // 1,024 Active Logic Nodes: Scrub dynamic wave phase and 3D perspective across scroll
  if (substrate) {
    const waveProxy = { wave: 0 };
    timeline.to(waveProxy, {
      wave: 1440,
      duration: 1,
      ease: 'none',
      onUpdate: () => {
        substrate.style.setProperty('--scroll-wave', `${waveProxy.wave.toFixed(1)}deg`);
      }
    }, 0);

    timeline.to(substrate, {
      rotationX: desktop ? 16 : 10,
      rotationY: desktop ? -12 : -6,
      scale: desktop ? 1.04 : 1.02,
      y: desktop ? -20 : -12,
      duration: 1,
      ease: 'none'
    }, 0);
  }

  // Tilt and elevate the main studio card
  if (mainImage) {
    timeline.to(mainImage, {
      xPercent: desktop ? -5 : 0,
      y: desktop ? -35 : -18,
      rotationX: desktop ? 6 : 4,
      rotationY: desktop ? -5 : -3,
      z: desktop ? 45 : 20,
      scale: 1.02,
      duration: 1,
      ease: 'none'
    }, 0);
  }

  // Scrub copy and grid
  if (heroCopy) timeline.to(heroCopy, { y: desktop ? -45 : -25, opacity: 0.96, duration: 0.9 }, 0);
  if (heroGrid) timeline.to(heroGrid, { y: desktop ? 60 : 30, scale: 1.05, duration: 1 }, 0);

  // Staggered 3D elevation for stage cards
  if (stageCards.length) {
    timeline.to(stageCards, { y: -14, scale: 1.03, stagger: 0.08, duration: 0.8 }, 0.1);
  }

  // 3D parallax on orbit chips
  const chipLeft = select('.chip-left');
  const chipCenter = select('.chip-center');
  const chipRight = select('.chip-right');
  if (chipLeft) timeline.to(chipLeft, { x: -30, y: -20, duration: 1 }, 0);
  if (chipCenter) timeline.to(chipCenter, { y: -25, scale: 1.08, duration: 1 }, 0);
  if (chipRight) timeline.to(chipRight, { x: 30, y: -20, duration: 1 }, 0);

  // Animate proof items and workflow milestones with scroll scrub
  if (proofItems.length) timeline.to(proofItems, { y: -14, stagger: 0.05, duration: 0.8 }, 0.1);
  if (workflowItems.length) timeline.to(workflowItems, { y: -10, stagger: 0.05, duration: 0.8 }, 0.2);
  if (orbs.length) timeline.to(orbs, { y: 40, scale: 1.15, duration: 1 }, 0);
};

export default function Opening() {
  const ref = useScene(build);
  useEntrance(ref);
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
      <div className="hero-content-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow" data-entrance><span className="status-dot"/>{hero.eyebrow} · {personal.name}</p>
          <h1 id="hero-title" aria-label={hero.heading}><AnimatedText>{hero.heading}</AnimatedText></h1>
          <p className="hero-body" data-entrance>{hero.body}</p>
          <div className="hero-proof-strip" aria-label="Key qualifications">
            {hero.proofStrip.map((item) => (
              <div key={item.label} className="proof-item">
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
          <div className="hero-actions" data-entrance>
            <ActionLink href="#projects">{hero.primary}</ActionLink>
            <a href={personal.resume} download className="action action-quiet">Resume<ArrowDownIcon aria-hidden="true"/></a>
            <a href={socials[1].url} target="_blank" rel="noopener noreferrer" className="text-link">GitHub<ArrowUpRightIcon aria-hidden="true"/></a>
            <a href={socials[2].url} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn<ArrowUpRightIcon aria-hidden="true"/></a>
            <a href="#contact" className="text-link">Contact<ArrowUpRightIcon aria-hidden="true"/></a>
          </div>
        </div>
        <div className="hero-gallery" data-hero-gallery aria-label="Interactive Architecture Studio">
          <CreativeStudio />
        </div>
      </div>
      <ol className="hero-workflow" aria-label={hero.workflowTitle} data-spatial="stagger-3d">{hero.workflow.map((step)=><li key={step}>{step}</li>)}</ol>
      <div className="hero-bottom"><span>TypeScript · React · Next.js · PostgreSQL · Python</span><a href="#about" className="scroll-hint">Scroll to explore<ArrowDownIcon aria-hidden="true"/></a><span>60+ Shipped · Production Systems</span></div>
    </div>
  </section>;
}
