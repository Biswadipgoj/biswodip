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
 * Master 3D & Multi-Scroll Editorial Animation Engine:
 * 
 * [data-reveal]          — fade up from 32px below
 * [data-reveal="left"]   — slide in from left
 * [data-reveal="right"]  — slide in from right
 * [data-reveal="scale"]  — scale from 0.85 with spring
 * [data-reveal="clip"]   — clip-path reveal from bottom
 * [data-reveal="blur"]   — blur(8px) to clear
 * [data-reveal="rotate"] — slight rotation reveal
 * [data-reveal="3d-flip"]— 3D perspective fold-up (rotateX)
 * [data-reveal="3d-depth"]— 3D perspective fly-in from Z-space
 * [data-tilt-3d]         — Interactive physical 3D card tilt on mouse move with specular shine
 * [data-parallax-3d]     — Multi-layer 3D parallax scroll depth
 * [data-magnetic]        — Magnetic cursor attraction on buttons
 * [data-media]           — parallax scale & 3D tilt scrub on images
 * [data-wire]            — horizontal line draw-on
 * [data-stagger]         — container: children stagger in
 * [data-parallax]        — subtle parallax y-shift on scroll
 * [data-parallax="deep"] — deeper parallax shift
 * [data-count]           — counter animation (0 to value)
 * [data-split]           — word-by-word reveal
 * [data-progress]        — width animation (progress bars)
 * [data-draw]            — SVG path draw-on
 * [data-float]           — continuous gentle float
 * [data-float-3d]        — continuous 3D floating rotation
 * [data-pulse]           — subtle pulse on enter
 * [data-slide-x]         — horizontal slide scrub
 * [data-fade-section]    — full section opacity transition
 * [data-border-draw]     — progressive border draw
 * [data-index-reveal]    — step number badge 3D pop
 */
export function useEditorialReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {

        // ─── 1. Standard & 3D Reveal Variants ───
        gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach(element => {
          const variant = element.dataset.reveal;
          let from: gsap.TweenVars = { y: 32, opacity: 0 };
          let to: gsap.TweenVars = { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' };

          if (variant === 'left') {
            from = { x: -48, opacity: 0 };
            to = { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' };
          } else if (variant === 'right') {
            from = { x: 48, opacity: 0 };
            to = { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' };
          } else if (variant === 'scale') {
            from = { scale: 0.85, opacity: 0 };
            to = { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' };
          } else if (variant === 'clip') {
            from = { clipPath: 'inset(100% 0 0 0)', opacity: 0 };
            to = { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 0.9, ease: 'power3.out' };
          } else if (variant === 'blur') {
            from = { filter: 'blur(8px)', opacity: 0, y: 12 };
            to = { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' };
          } else if (variant === 'rotate') {
            from = { rotate: -3, y: 20, opacity: 0 };
            to = { rotate: 0, y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' };
          } else if (variant === '3d-flip') {
            from = { transformPerspective: 1000, rotateX: 20, y: 40, opacity: 0, scale: 0.95 };
            to = { rotateX: 0, y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' };
          } else if (variant === '3d-depth') {
            from = { transformPerspective: 1200, z: -80, y: 30, opacity: 0, scale: 0.9 };
            to = { z: 0, y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'back.out(1.2)' };
          }

          gsap.fromTo(element, from, {
            ...to,
            scrollTrigger: {
              trigger: element,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // ─── 2. Interactive 3D Card Tilt with Specular Reflection ───
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
              const rotateX = ((y - centerY) / centerY) * -9;
              const rotateY = ((x - centerX) / centerX) * 9;

              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);

              gsap.to(card, {
                transformPerspective: 1200,
                rotateX: rotateX,
                rotateY: rotateY,
                scale3d: [1.02, 1.02, 1.02],
                duration: 0.35,
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
              duration: 0.6,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
        });

        // ─── 3. Magnetic Button Hover ───
        gsap.utils.toArray<HTMLElement>('[data-magnetic]', root).forEach(btn => {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.25, ease: 'power2.out' });
          };
          const handleMouseLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
          };
          btn.addEventListener('mousemove', handleMouseMove);
          btn.addEventListener('mouseleave', handleMouseLeave);
        });

        // ─── 4. Media Parallax & 3D Perspective Scrub (images/screenshots) ───
        gsap.utils.toArray<HTMLElement>('[data-media]', root).forEach(element => {
          gsap.fromTo(element,
            { transformPerspective: 1000, rotateX: 6, scale: 0.92, y: 32, opacity: 0.8 },
            {
              rotateX: 0, scale: 1, y: 0, opacity: 1, ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 94%', end: 'center 48%', scrub: 0.5,
              },
            }
          );
        });

        // ─── 5. Wire Draw (horizontal lines) ───
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

        // ─── 6. Stagger containers ───
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
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // ─── 7. Parallax Y-shift (Subtle & Deep) ───
        gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach(element => {
          const isDeep = element.dataset.parallax === 'deep';
          const distance = isDeep ? 60 : 30;
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
            { transformPerspective: 1000, z: -40, rotateZ: -4, y: 35 },
            {
              z: 20, rotateZ: 4, y: -35, ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom', end: 'bottom top', scrub: 0.6,
              },
            }
          );
        });

        // ─── 9. Counter animation ───
        gsap.utils.toArray<HTMLElement>('[data-count]', root).forEach(element => {
          const target = parseInt(element.dataset.count || '0', 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.4, ease: 'power2.out',
            onUpdate: () => { element.textContent = Math.round(obj.val).toString(); },
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          });
        });

        // ─── 10. Word-by-word text split ───
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
              { y: 22, opacity: 0 },
              {
                y: 0, opacity: 1, duration: 0.45, ease: 'power2.out',
                stagger: 0.035,
                scrollTrigger: {
                  trigger: element,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        });

        // ─── 11. Progress bar width ───
        gsap.utils.toArray<HTMLElement>('[data-progress]', root).forEach(element => {
          const target = element.dataset.progress || '100';
          gsap.fromTo(element,
            { width: '0%' },
            {
              width: target + '%', duration: 1.2, ease: 'power2.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // ─── 12. SVG Path Draw ───
        gsap.utils.toArray<SVGPathElement>('[data-draw]', root).forEach(path => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0, ease: 'none',
            scrollTrigger: {
              trigger: path.closest('svg') || path,
              start: 'top 80%', end: 'bottom 40%', scrub: 0.5,
            },
          });
        });

        // ─── 13. Continuous Float (2D & 3D) ───
        gsap.utils.toArray<HTMLElement>('[data-float]', root).forEach(element => {
          gsap.to(element, {
            y: -8, duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-float-3d]', root).forEach(element => {
          gsap.to(element, {
            transformPerspective: 800,
            y: -12,
            rotateX: 6,
            rotateY: -8,
            duration: 3.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });

        // ─── 14. Pulse on enter ───
        gsap.utils.toArray<HTMLElement>('[data-pulse]', root).forEach(element => {
          gsap.fromTo(element,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // ─── 15. Horizontal slide scrub ───
        gsap.utils.toArray<HTMLElement>('[data-slide-x]', root).forEach(element => {
          const direction = element.dataset.slideX === 'right' ? 80 : -80;
          gsap.fromTo(element,
            { x: direction, opacity: 0.4 },
            {
              x: 0, opacity: 1, ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 95%', end: 'top 45%', scrub: 0.5,
              },
            }
          );
        });

        // ─── 16. Section fade transitions ───
        gsap.utils.toArray<HTMLElement>('[data-fade-section]', root).forEach(element => {
          gsap.fromTo(element,
            { opacity: 0 },
            {
              opacity: 1, ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 98%', end: 'top 70%', scrub: true,
              },
            }
          );
        });

        // ─── 17. Border draw-on for elements ───
        gsap.utils.toArray<HTMLElement>('[data-border-draw]', root).forEach(element => {
          gsap.fromTo(element,
            { backgroundSize: '0% 1px' },
            {
              backgroundSize: '100% 1px', ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 85%', end: 'top 55%', scrub: 0.4,
              },
            }
          );
        });

        // ─── 18. Index/number counter reveal ───
        gsap.utils.toArray<HTMLElement>('[data-index-reveal]', root).forEach((element, i) => {
          gsap.fromTo(element,
            { scale: 0.6, opacity: 0, rotate: -8 },
            {
              scale: 1, opacity: 1, rotate: 0, duration: 0.5,
              delay: i * 0.06,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

      }, root);

      return () => ctx.revert();
    }, root);

    return () => media.revert();
  }, []);

  return ref;
}
