'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export type SceneBuilder = (timeline: gsap.core.Timeline, root: HTMLElement, desktop: boolean) => void;

/**
 * Progressive enhancement: natural document flow until a timeline is ready.
 * CSS sticky owns pinning; GSAP owns reversible transforms. No React scroll state.
 */
export function useScene(build: SceneBuilder) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 800px)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
      if (!context.conditions?.motion) return;
      root.dataset.animated = 'true';
      const stages = [...root.querySelectorAll<HTMLElement>('[data-range]')];
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            for (const stage of stages) {
              const [start, end] = stage.dataset.range!.split(',').map(Number);
              const inactive = progress < start || progress > end;
              stage.inert = inactive;
              stage.setAttribute('aria-hidden', String(inactive));
            }
          },
        },
      });
      build(timeline, root, Boolean(context.conditions.desktop));
      timeline.to({}, { duration: 0.001 }, 1);
      return () => {
        delete root.dataset.animated;
        stages.forEach(stage => { stage.inert = false; stage.removeAttribute('aria-hidden'); });
      };
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    return () => { window.removeEventListener('load', refresh); media.revert(); };
  }, [build]);
  return ref;
}

/**
 * Robust, High-Performance 3D & Multi-Scroll Animation System
 */
export function useEditorialReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {

        // ─── 1. Scroll-Driven Reveal Animations ───
        gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach(element => {
          const variant = element.dataset.reveal;
          let from: gsap.TweenVars = { y: 36, opacity: 0 };
          let to: gsap.TweenVars = { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' };

          if (variant === 'left') {
            from = { x: -50, opacity: 0 };
            to = { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out' };
          } else if (variant === 'right') {
            from = { x: 50, opacity: 0 };
            to = { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out' };
          } else if (variant === 'scale') {
            from = { scale: 0.85, opacity: 0 };
            to = { scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.5)' };
          } else if (variant === 'clip') {
            from = { clipPath: 'inset(100% 0 0 0)', opacity: 0 };
            to = { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 0.9, ease: 'power3.out' };
          } else if (variant === 'blur') {
            from = { filter: 'blur(10px)', opacity: 0, y: 16 };
            to = { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' };
          } else if (variant === 'rotate') {
            from = { rotate: -4, y: 24, opacity: 0 };
            to = { rotate: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' };
          } else if (variant === '3d-flip') {
            from = { transformPerspective: 1200, rotateX: 24, y: 44, opacity: 0, scale: 0.94 };
            to = { rotateX: 0, y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' };
          } else if (variant === '3d-depth') {
            from = { transformPerspective: 1200, z: -100, y: 36, opacity: 0, scale: 0.88 };
            to = { z: 0, y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'back.out(1.3)' };
          }

          gsap.fromTo(element, from, {
            ...to,
            scrollTrigger: {
              trigger: element,
              start: 'top 94%',
              toggleActions: 'play none none none',
              once: true,
            },
          });
        });

        // ─── 1B. Continuous 3D Scroll Perspective & Depth Cylinder ───
        gsap.utils.toArray<HTMLElement>('[data-scroll-3d]', root).forEach(element => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 98%',
              end: 'bottom 2%',
              scrub: 0.5,
            },
          });
          tl.fromTo(element,
            { transformPerspective: 1400, rotateX: 13, scale: 0.95, z: -60, opacity: 0.8 },
            { rotateX: 0, scale: 1.01, z: 0, opacity: 1, duration: 0.5, ease: 'power1.out' }
          ).to(element,
            { rotateX: -9, scale: 0.97, z: -40, opacity: 0.88, duration: 0.5, ease: 'power1.in' }
          );
        });

        // ─── 2. Interactive 3D Card Tilt with Dynamic Specular Reflection ───
        gsap.utils.toArray<HTMLElement>('[data-tilt-3d]', root).forEach(card => {
          let ticking = false;
          const handleMouseMove = (e: MouseEvent) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -11;
              const rotateY = ((x - centerX) / centerX) * 11;

              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);

              gsap.to(card, {
                transformPerspective: 1200,
                rotateX: rotateX,
                rotateY: rotateY,
                scale3d: [1.03, 1.03, 1.03],
                duration: 0.28,
                ease: 'power2.out',
                overwrite: 'auto',
              });
              ticking = false;
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              transformPerspective: 1200,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.65,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        });

        // ─── 3. Magnetic Hover on Buttons & Links ───
        gsap.utils.toArray<HTMLElement>('[data-magnetic]', root).forEach(btn => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.2, ease: 'power2.out' });
          };
          const handleMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' });
          };
          btn.addEventListener('mousemove', handleMouseMove);
          btn.addEventListener('mouseleave', handleMouseLeave);
        });

        // ─── 4. Media 3D Perspective Scrub on Scroll (Floating Glass Displays) ───
        gsap.utils.toArray<HTMLElement>('[data-media]', root).forEach(element => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: 'top 98%',
              end: 'bottom 5%',
              scrub: 0.5,
            },
          });
          tl.fromTo(element,
            { transformPerspective: 1400, rotateX: 16, rotateY: -4, scale: 0.92, z: -80, opacity: 0.8 },
            { rotateX: 0, rotateY: 0, scale: 1.0, z: 0, opacity: 1, duration: 0.5, ease: 'power1.out' }
          ).to(element,
            { rotateX: -10, rotateY: 3, scale: 0.96, z: -50, opacity: 0.86, duration: 0.5, ease: 'power1.in' }
          );
        });

        // ─── 5. Wire Draw (horizontal workflow lines) ───
        gsap.utils.toArray<HTMLElement>('[data-wire]', root).forEach(element => {
          gsap.fromTo(element,
            { scaleX: 0, transformOrigin: 'left' },
            {
              scaleX: 1, ease: 'none',
              scrollTrigger: {
                trigger: element.closest('ol') || element.parentElement,
                start: 'top 85%', end: 'bottom 42%', scrub: 0.4,
              },
            }
          );
        });

        // ─── 6. Stagger Containers ───
        gsap.utils.toArray<HTMLElement>('[data-stagger]', root).forEach(container => {
          const children = [...container.children] as HTMLElement[];
          if (!children.length) return;
          gsap.fromTo(children,
            { y: 28, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.55, ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: container,
                start: 'top 92%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });

        // ─── 7. Parallax Y-shift (Subtle & Deep) ───
        gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach(element => {
          const isDeep = element.dataset.parallax === 'deep';
          const distance = isDeep ? 70 : 35;
          gsap.fromTo(element,
            { y: distance },
            {
              y: -distance, ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom', end: 'bottom top', scrub: true,
              },
            }
          );
        });

        // ─── 8. Multi-Layer 3D Parallax Drift ───
        gsap.utils.toArray<HTMLElement>('[data-parallax-3d]', root).forEach(element => {
          gsap.fromTo(element,
            { transformPerspective: 1200, z: -60, rotateZ: -6, y: 50 },
            {
              z: 35, rotateZ: 6, y: -50, ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom', end: 'bottom top', scrub: 0.6,
              },
            }
          );
        });

        // ─── 9. Counter Animation ───
        gsap.utils.toArray<HTMLElement>('[data-count]', root).forEach(element => {
          const target = parseInt(element.dataset.count || '0', 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.4, ease: 'power2.out',
            onUpdate: () => { element.textContent = Math.round(obj.val).toString(); },
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          });
        });

        // ─── 10. Word-by-word Text Split with 3D Tilt ───
        gsap.utils.toArray<HTMLElement>('[data-split]', root).forEach(element => {
          const wrapTextNodes = (parent: Node) => {
            const children = [...parent.childNodes];
            children.forEach(node => {
              if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                const words = node.textContent.split(/(\s+)/);
                const fragment = document.createDocumentFragment();
                words.forEach(part => {
                  if (part.trim()) {
                    const span = document.createElement('span');
                    span.style.display = 'inline-block';
                    span.style.marginRight = '0.15em';
                    span.style.transformOrigin = '50% 100%';
                    span.textContent = part;
                    span.classList.add('split-word');
                    fragment.appendChild(span);
                  } else if (part) {
                    fragment.appendChild(document.createTextNode(part));
                  }
                });
                parent.replaceChild(fragment, node);
              } else if (node.nodeType === Node.ELEMENT_NODE) {
                const el = node as HTMLElement;
                if (el.tagName !== 'BR') {
                  wrapTextNodes(el);
                }
              }
            });
          };
          wrapTextNodes(element);
          const splitWords = element.querySelectorAll('.split-word');
          if (splitWords.length) {
            gsap.fromTo(splitWords,
              { y: 26, rotateX: 35, opacity: 0, transformPerspective: 800 },
              {
                y: 0, rotateX: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
                stagger: 0.04,
                scrollTrigger: {
                  trigger: element,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                  once: true,
                },
              }
            );
          }
        });

        // ─── 11. Continuous 3D Floating Physics ───
        gsap.utils.toArray<HTMLElement>('[data-float-3d]', root).forEach(element => {
          gsap.to(element, {
            transformPerspective: 800,
            y: -14,
            rotateX: 6,
            rotateY: -8,
            duration: 3.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-float]', root).forEach(element => {
          gsap.to(element, {
            y: -8, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
          });
        });

        // ─── 12. Pulse on Enter ───
        gsap.utils.toArray<HTMLElement>('[data-pulse]', root).forEach(element => {
          gsap.fromTo(element,
            { scale: 0.85, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.55, ease: 'elastic.out(1.1, 0.5)',
              scrollTrigger: {
                trigger: element,
                start: 'top 92%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });

        // ─── 13. Section Fade & Scale Transitions ───
        gsap.utils.toArray<HTMLElement>('[data-fade-section]', root).forEach(element => {
          gsap.fromTo(element,
            { opacity: 0.2, y: 36, scale: 0.98 },
            {
              opacity: 1, y: 0, scale: 1, ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 96%', end: 'top 65%', scrub: 0.5,
              },
            }
          );
        });

        // ─── 14. Step Index Reveal ───
        gsap.utils.toArray<HTMLElement>('[data-index-reveal]', root).forEach((element, i) => {
          gsap.fromTo(element,
            { scale: 0.6, opacity: 0, rotate: -8 },
            {
              scale: 1, opacity: 1, rotate: 0, duration: 0.5,
              delay: i * 0.05,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none none',
                once: true,
              },
            }
          );
        });

        // ─── 15. Global Cursor Tracking for Ambient Glass Refraction ───
        const handleGlobalPointerMove = (e: MouseEvent) => {
          const xPercent = (e.clientX / window.innerWidth) * 100;
          const yPercent = (e.clientY / window.innerHeight) * 100;
          document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
          document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
          document.documentElement.style.setProperty('--cursor-xp', `${xPercent}%`);
          document.documentElement.style.setProperty('--cursor-yp', `${yPercent}%`);
        };
        window.addEventListener('mousemove', handleGlobalPointerMove, { passive: true });

      }, root);

      return () => ctx.revert();
    }, root);

    return () => media.revert();
  }, []);

  return ref;
}
