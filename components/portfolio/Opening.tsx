'use client';
import { hero, personal, socials } from '@/lib/data';
import { ActionLink } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { useEntrance } from '@/components/cinematic/useEntrance';
import HeroShowcase from '@/components/portfolio/HeroShowcase';

const build: SceneBuilder = (timeline, root, desktop) => {
  const select = (selector: string) => root.querySelector<HTMLElement>(selector);
  const selectAll = (selector: string) => [...root.querySelectorAll<HTMLElement>(selector)];
  const heroCopy = select('.hero-copy');
  const heroGrid = select('.hero-grid');
  const mainImage = select('.hero-main-image');
  const secondaryCard = select('.showcase-layer-card.secondary-card');
  const pillBadge = select('.showcase-floating-pill');
  const proofItems = selectAll('.proof-item');
  const workflowItems = selectAll('.hero-workflow li');
  const orbs = selectAll('.spatial-ambient-orb');

  // Multi-layered 3D perspective scroll transform for production planes
  if (mainImage) {
    timeline.to(mainImage, {
      xPercent: desktop ? -3 : 0,
      y: desktop ? -28 : -14,
      rotationX: desktop ? 8 : 4,
      rotationY: desktop ? -6 : -3,
      z: desktop ? 40 : 15,
      duration: 1,
      ease: 'none'
    }, 0);
  }

  if (secondaryCard) {
    timeline.to(secondaryCard, {
      xPercent: desktop ? 4 : 2,
      y: desktop ? -42 : -20,
      rotationX: desktop ? 12 : 6,
      rotationY: desktop ? -10 : -5,
      z: desktop ? -20 : -10,
      duration: 1,
      ease: 'none'
    }, 0);
  }

  if (pillBadge) {
    timeline.to(pillBadge, {
      y: desktop ? -18 : -8,
      scale: 1.05,
      duration: 1,
      ease: 'none'
    }, 0);
  }

  // Scrub copy and grid
  if (heroCopy) timeline.to(heroCopy, { y: desktop ? -40 : -20, opacity: 0.96, duration: 0.9 }, 0);
  if (heroGrid) timeline.to(heroGrid, { y: desktop ? 50 : 25, scale: 1.04, duration: 1 }, 0);

  // Animate proof items and workflow milestones with scroll scrub
  if (proofItems.length) timeline.to(proofItems, { y: -12, stagger: 0.05, duration: 0.8 }, 0.1);
  if (workflowItems.length) timeline.to(workflowItems, { y: -10, stagger: 0.05, duration: 0.8 }, 0.2);
  if (orbs.length) timeline.to(orbs, { y: 35, scale: 1.12, duration: 1 }, 0);
};

export default function Opening() {
  const ref = useScene(build);
  useEntrance(ref);

  return (
    <section id="opening" ref={ref} className="opening" aria-labelledby="hero-title" data-motion-root>
      <div className="hero-stage">
        <div className="hero-grid" aria-hidden="true" />
        <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '8%', right: '12%', width: 440, height: 440, background: 'radial-gradient(circle, rgba(147, 199, 179, 0.6), transparent 70%)' }} aria-hidden="true" />
        <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '12%', left: '5%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(232, 166, 124, 0.52), transparent 70%)' }} aria-hidden="true" />
        
        <div className="hero-content-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow" data-entrance>
              <span className="status-dot" />
              {hero.eyebrow} · {personal.name}
            </p>
            <h1 id="hero-title" aria-label={hero.heading}>
              <AnimatedText>{hero.heading}</AnimatedText>
            </h1>
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
              <a href={personal.resume} download className="action action-quiet">
                Resume<ArrowDownIcon aria-hidden="true" />
              </a>
              <a href={socials[1].url} target="_blank" rel="noopener noreferrer" className="text-link">
                GitHub<ArrowUpRightIcon aria-hidden="true" />
              </a>
              <a href={socials[2].url} target="_blank" rel="noopener noreferrer" className="text-link">
                LinkedIn<ArrowUpRightIcon aria-hidden="true" />
              </a>
              <a href="#contact" className="text-link">
                Contact<ArrowUpRightIcon aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-gallery" data-hero-gallery aria-label="Verified Production Systems Showcase">
            <HeroShowcase />
          </div>
        </div>

        <ol className="hero-workflow" aria-label={hero.workflowTitle} data-spatial="stagger-3d">
          {hero.workflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <div className="hero-bottom">
          <span>TypeScript · React · Next.js · PostgreSQL · Python</span>
          <a href="#about" className="scroll-hint">
            Scroll to explore<ArrowDownIcon aria-hidden="true" />
          </a>
          <span>60+ Shipped · Production Systems</span>
        </div>
      </div>
    </section>
  );
}
