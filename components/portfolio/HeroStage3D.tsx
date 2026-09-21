'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { projects } from '@/lib/data';

/**
 * The five real product screens as planes in one 3D rig. Opening.tsx scrubs the rig from a
 * floating isometric stack (layer) into a curved wall facing the reader (slot); this component
 * only owns the markup and the pointer parallax on the wrapper above the rig.
 *
 * layer: stacking height in the isometric state (4 = top of the stack).
 * slot: position in the final wall (0 = centre, front).
 */
const ARRANGEMENT: Record<string, { layer: number; slot: number }> = {
  erpixa: { layer: 0, slot: -2 },
  telepoint: { layer: 1, slot: 2 },
  tripmate: { layer: 2, slot: -1 },
  nexora: { layer: 3, slot: 1 },
  nanolink: { layer: 4, slot: 0 },
};

// The four technologies used across the most projects, lifted into the scene as depth markers.
const usage = new Map<string, number>();
for (const tech of projects.flatMap(project => project.techStack)) usage.set(tech, (usage.get(tech) ?? 0) + 1);
const CHIPS = [...usage.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([tech]) => tech);

export default function HeroStage3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const planes = [...projects].sort((a, b) => (ARRANGEMENT[a.slug]?.layer ?? 0) - (ARRANGEMENT[b.slug]?.layer ?? 0));

  // Pointer parallax: the whole rig leans toward the cursor. Decorative, so fine pointers only.
  useEffect(() => {
    const scene = sceneRef.current;
    const tilt = tiltRef.current;
    if (!scene || !tilt) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const rotateX = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3.out' });
      const rotateY = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3.out' });
      const zone = scene.closest<HTMLElement>('.hero-stage') ?? scene;
      const move = (event: PointerEvent) => {
        const rect = zone.getBoundingClientRect();
        rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 10);
        rotateX(-((event.clientY - rect.top) / rect.height - 0.5) * 7);
      };
      const leave = () => { rotateX(0); rotateY(0); };
      zone.addEventListener('pointermove', move);
      zone.addEventListener('pointerleave', leave);
      return () => {
        zone.removeEventListener('pointermove', move);
        zone.removeEventListener('pointerleave', leave);
      };
    });
    return () => media.revert();
  }, []);

  return (
    <div className="hero-scene" ref={sceneRef} aria-label="Five production applications">
      <div className="hero-scene-glow" aria-hidden="true" />
      <div className="hero-floor" aria-hidden="true"><div className="hero-floor-grid" /></div>
      <div className="hero-tilt" ref={tiltRef}>
        <div className="hero-rig">
          {planes.map(project => {
            const { layer, slot } = ARRANGEMENT[project.slug] ?? { layer: 0, slot: 0 };
            const host = new URL(project.url).hostname;
            return (
              <Link
                key={project.slug}
                href={`/project/${project.slug}`}
                prefetch={false}
                className={'hero-plane' + (slot === 0 ? ' hero-main-image' : '')}
                data-layer={layer}
                data-slot={slot}
                style={{ '--slot': slot, '--slot-abs': Math.abs(slot) } as CSSProperties}
                aria-label={`${project.name}: inspect the engineering`}
              >
                <div className="hero-card">
                  <div className="hero-card-face">
                    <div className="hero-card-bar" aria-hidden="true">
                      <span className="hero-card-dots"><i /><i /><i /></span>
                      <span className="hero-card-host">{host}</span>
                      <span className="hero-card-live"><span className="live-pulse-dot" />Live</span>
                    </div>
                    <div className="hero-card-shot">
                      <Image src={project.previewImage} alt={project.imageAlt} fill sizes="(max-width: 799px) 64vw, 340px" priority={slot === 0} />
                    </div>
                    <div className="hero-card-caption">
                      <strong>{project.name}</strong>
                      <span>{project.blurb}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {CHIPS.map((chip, index) => (
            <span key={chip} className={`hero-chip hero-chip-${index}`} aria-hidden="true">{chip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
