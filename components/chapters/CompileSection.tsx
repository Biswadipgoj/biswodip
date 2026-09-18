'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personal, compileTokens, architectureLayers, type CompileToken } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

/** Group tokens by layer */
function tokensByLayer(layer: CompileToken['layer']) {
  return compileTokens.filter((t) => t.layer === layer);
}

export default function CompileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tokensRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const tokenEls = gsap.utils.toArray<HTMLElement>('.compile-token');
      const storyEls = gsap.utils.toArray<HTMLElement>('.compile-story-block');
      const layerEls = gsap.utils.toArray<HTMLElement>('.compile-layer');

      // Main scroll-scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
        },
      });

      // Background color transition: dark → warm neutral
      tl.to(section, {
        backgroundColor: '#EFE9DE',
        color: '#2a2724',
        ease: 'none',
        duration: 1,
      }, 0);

      // Tokens: scattered → organized
      // Initially tokens are in a cloud; they move to their layer positions
      tokenEls.forEach((token, i) => {
        // Random scatter position
        const scatterX = (Math.random() - 0.5) * 200;
        const scatterY = (Math.random() - 0.5) * 100;
        const scatterRotate = (Math.random() - 0.5) * 15;

        gsap.set(token, {
          x: scatterX,
          y: scatterY,
          rotation: scatterRotate,
          opacity: 0.4,
        });

        // Animate to organized position
        tl.to(token, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.1 + (i * 0.02));
      });

      // Story blocks fade in
      storyEls.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 30 });
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }, 0.15 + (i * 0.12));
      });

      // Layer containers fade in
      layerEls.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 20 });
        tl.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.3 + (i * 0.08));
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="compile"
      ref={sectionRef}
      className="compile-chapter"
      aria-labelledby="compile-title"
      style={{
        backgroundColor: 'var(--compile-bg-start)',
        color: 'var(--compile-ink-start)',
      }}
    >
      {/* Extra scroll height for scrub animation */}
      <div style={{ minHeight: '200vh', padding: '120px 0' }}>
        <div className="chapter-inner">
          <div className="compile-content" ref={contentRef}>
            {/* Left: Story / Identity */}
            <div className="compile-story" ref={storyRef}>
              <div className="compile-story-block">
                <h2 id="compile-title" style={{ marginBottom: '24px' }}>
                  Context, discipline, and<br />how I think about software.
                </h2>
              </div>
              <div className="compile-story-block">
                <p style={{ lineHeight: 1.75, marginBottom: '16px' }}>{personal.about}</p>
              </div>
              <div className="compile-story-block">
                <p style={{ lineHeight: 1.75, marginBottom: '16px' }}>{personal.intro}</p>
              </div>
              <div className="compile-story-block">
                <p className="mono" style={{ fontSize: '0.85rem', opacity: 0.6, paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  {personal.education}
                </p>
              </div>
            </div>

            {/* Right: Architecture Layers with Tokens */}
            <div className="compile-layers" ref={layersRef}>
              {architectureLayers.map((layer) => (
                <div key={layer.id} className="compile-layer">
                  <div className="compile-layer-title">{layer.label}</div>
                  <p style={{ fontSize: '0.82rem', opacity: 0.55, marginBottom: '14px', lineHeight: 1.5 }}>
                    {layer.sublabel}
                  </p>
                  <div className="compile-layer-tokens" ref={tokensRef}>
                    {tokensByLayer(layer.id).map((token) => (
                      <span key={token.name} className="token-pill compile-token">
                        {token.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
