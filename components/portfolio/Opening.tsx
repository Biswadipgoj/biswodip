'use client';
import Image from 'next/image';
import { hero, personal, socials } from '@/lib/data';
import { ActionLink } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons';
import { gsap } from 'gsap';
import { useScene, type SceneBuilder } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import HeroStage3D from '@/components/portfolio/HeroStage3D';

/** Wall positions by slot: x as a share of plane width, depth in px, yaw in degrees. */
const WALL: Record<number, { x: number; z: number; yaw: number }> = {
  [-2]: { x: -80, z: -340, yaw: 28 }, [-1]: { x: -44, z: -150, yaw: 16 },
  0: { x: 0, z: 60, yaw: 0 },
  1: { x: 44, z: -150, yaw: -16 }, 2: { x: 80, z: -340, yaw: -28 },
};

const build: SceneBuilder = (timeline, root, desktop) => {
  const select = (selector: string) => root.querySelector<HTMLElement>(selector);
  const selectAll = (selector: string) => [...root.querySelectorAll<HTMLElement>(selector)];
  const heroCopy = select('.hero-copy');
  const heroGrid = select('.hero-grid');
  const scene = select('.hero-scene');
  const rig = select('.hero-rig');
  const planes = selectAll('.hero-plane');
  const cards = selectAll('.hero-card');
  const chips = selectAll('.hero-chip');
  const floorGrid = select('.hero-floor-grid');
  const glow = select('.hero-scene-glow');
  const proofItems = selectAll('.proof-item');
  const workflowItems = selectAll('.hero-workflow li');
  const orbs = selectAll('.spatial-ambient-orb');

  // --- Arrival: the screens fly in out of depth and settle into the stack. Played once, not scrubbed;
  // it moves the inner card so it never fights the scroll transforms on the plane around it.
  if (cards.length && scene) {
    gsap.from(cards, {
      z: -900, rotationX: 38, opacity: 0, duration: 1.5, ease: 'expo.out',
      stagger: { each: 0.09, from: 'end' }, delay: 0.15, force3D: 'auto', clearProps: 'transform,opacity',
      scrollTrigger: { trigger: scene, start: 'top 92%', once: true },
    });
    if (floorGrid) gsap.from(floorGrid, { opacity: 0, duration: 1.6, ease: 'power2.out', delay: 0.3, clearProps: 'opacity' });
  }

  // --- Camera: the rig swings from a floating isometric stack to a wall of screens facing the reader.
  if (rig) {
    timeline.fromTo(rig,
      { x: 0, y: 0, rotationX: 54, rotationZ: -36, rotationY: 0, scale: desktop ? 0.9 : 0.82, yPercent: desktop ? 4 : 6 },
      { rotationX: 7, rotationZ: 0, rotationY: -4, scale: desktop ? 0.94 : 0.84, yPercent: -2, duration: 1 }, 0);
  }
  for (const plane of planes) {
    const layer = Number(plane.dataset.layer);
    const slot = WALL[Number(plane.dataset.slot)] ?? WALL[0];
    // Planes sit at the rig's centre (-50%/-50%); every transform component is explicit so GSAP
    // never inherits the CSS fallback layout's translate as a starting offset.
    timeline.fromTo(plane,
      { x: 0, y: 0, xPercent: -50 - layer * 6, yPercent: -50 + layer * 6, z: layer * 60, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1 },
      { xPercent: -50 + slot.x, yPercent: -50, z: slot.z, rotationY: slot.yaw, duration: 1 }, 0);
  }
  // Tech markers rise off the stack at different depths, so they parallax against the screens.
  chips.forEach((chip, index) => {
    timeline.fromTo(chip, { z: 110 + index * 30, yPercent: 0 }, { z: 240 + index * 50, yPercent: -120 - index * 40, duration: 1 }, 0);
  });
  // The floor streams toward the reader and the light blooms behind the wall.
  if (floorGrid) timeline.fromTo(floorGrid, { yPercent: 0 }, { yPercent: 30, duration: 1 }, 0);
  if (glow) timeline.fromTo(glow, { scale: 0.75, opacity: 0.55 }, { scale: 1.3, opacity: 1, duration: 1 }, 0);

  // Copy and background drift at their own depths.
  if (heroCopy) timeline.to(heroCopy, { y: desktop ? -60 : -20, duration: 0.9 }, 0);
  if (heroGrid) timeline.to(heroGrid, { y: desktop ? 50 : 25, scale: 1.04, duration: 1 }, 0);

  // Animate proof items and workflow milestones with scroll scrub
  if (proofItems.length) timeline.to(proofItems, { y: -12, stagger: 0.05, duration: 0.8 }, 0.1);
  // On phones the steps wrap into a 3×2 grid, where a staggered lift reads as misaligned rules.
  if (workflowItems.length && desktop) timeline.to(workflowItems, { y: -10, stagger: 0.05, duration: 0.8 }, 0.2);
  if (orbs.length) timeline.to(orbs, { y: 35, scale: 1.12, duration: 1 }, 0);
};

export default function Opening() {
  const ref = useScene(build);

  return (
    <section id="opening" ref={ref} className="opening" aria-labelledby="hero-title" data-motion-root>
      <div className="hero-stage">
        <div className="hero-grid" aria-hidden="true" />
        <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '8%', right: '12%', width: 440, height: 440, background: 'radial-gradient(circle, rgba(147, 199, 179, 0.6), transparent 70%)' }} aria-hidden="true" />
        <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '12%', left: '5%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(232, 166, 124, 0.52), transparent 70%)' }} aria-hidden="true" />
        
        <div className="hero-content-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span className="hero-avatar">
                <Image src="/biswodip.png" alt="" width={76} height={76} sizes="38px" priority />
                <span className="status-dot" aria-hidden="true" />
              </span>
              <span className="hero-eyebrow-text">
                <strong>{personal.name}</strong>
                <span>{hero.eyebrow}</span>
              </span>
            </p>
            <h1 id="hero-title" aria-label={hero.heading}>
              <AnimatedText>{hero.heading}</AnimatedText>
            </h1>
            <p className="hero-body">{hero.body}</p>

            <div className="hero-actions">
              <ActionLink href="#projects">{hero.primary}</ActionLink>
              <a href={personal.resume} download className="action action-quiet">
                Resume<ArrowDownIcon aria-hidden="true" />
              </a>
              <a href="#contact" className="action action-quiet">
                Contact<ArrowRightIcon aria-hidden="true" />
              </a>
            </div>
            <ul className="hero-links" aria-label="Profiles">
              <li>
                <a href={socials[1].url} target="_blank" rel="noopener noreferrer" className="link-chip">
                  GitHub<ArrowUpRightIcon aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={socials[2].url} target="_blank" rel="noopener noreferrer" className="link-chip">
                  LinkedIn<ArrowUpRightIcon aria-hidden="true" />
                </a>
              </li>
            </ul>

            <div className="hero-proof-strip" aria-label="Key qualifications">
              {hero.proofStrip.map((item) => (
                <div key={item.label} className="proof-item">
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-gallery" data-hero-gallery>
            <HeroStage3D />
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
          <span>50+ Shipped · Production Systems</span>
        </div>
      </div>
    </section>
  );
}
