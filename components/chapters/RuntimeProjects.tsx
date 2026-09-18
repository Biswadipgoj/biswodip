'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { projects, type Project } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

function ProjectSlide({ project, index }: { project: Project; index: number }) {
  const slideRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Subtle parallax on desktop (4-8px)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useTransform(mouseX, [-400, 400], [6, -6]);
  const imgY = useTransform(mouseY, [-300, 300], [4, -4]);

  useEffect(() => {
    if (reduceMotion || !slideRef.current) return;

    const handleMove = (e: MouseEvent) => {
      const rect = slideRef.current!.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const el = slideRef.current;
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, [reduceMotion, mouseX, mouseY]);

  useEffect(() => {
    if (reduceMotion || !slideRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slideRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play reverse play reverse',
        },
      });

      // Terminal command types in
      if (terminalRef.current) {
        gsap.set(terminalRef.current, { opacity: 0, y: 8 });
        tl.to(terminalRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 0);
      }

      // Screenshot boots in (CRT line → full image)
      if (screenshotRef.current) {
        gsap.set(screenshotRef.current, { scaleY: 0.005, opacity: 0.7 });
        tl.to(screenshotRef.current, {
          scaleY: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.25);
      }

      // Metadata slides in
      if (metaRef.current) {
        const metaChildren = metaRef.current.children;
        gsap.set(metaChildren, { opacity: 0, x: 20 });
        tl.to(metaChildren, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        }, 0.5);
      }
    }, slideRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div
      ref={slideRef}
      className="runtime-project"
      data-project={project.slug}
    >
      <div className="runtime-project-inner">
        {/* Terminal command */}
        <div ref={terminalRef} className="runtime-terminal mono">
          <span className="prompt">❯</span>
          <span>{project.terminalCommand}</span>
        </div>

        {/* Screenshot with CRT boot-in */}
        <motion.div
          ref={screenshotRef}
          className="runtime-screenshot"
          style={{
            transformOrigin: 'center',
            x: reduceMotion ? 0 : imgX,
            y: reduceMotion ? 0 : imgY,
          }}
        >
          <Image
            src={project.previewImage}
            alt={`${project.name} — ${project.blurb}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
            priority={index === 0}
            loading={index === 0 ? undefined : 'lazy'}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        {/* Metadata */}
        <div ref={metaRef} className="runtime-meta">
          <h3>{project.name}</h3>
          <p className="problem">{project.blurb}</p>
          <div className="runtime-tags">
            {project.techStack.map((tech) => (
              <span key={tech} className="runtime-tag">{tech}</span>
            ))}
          </div>
          <p className="runtime-note">{project.technicalNote}</p>
          <div className="runtime-links">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="runtime-link"
            >
              View live <span aria-hidden="true">↗</span>
            </a>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="runtime-link"
              >
                Source code <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RuntimeProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="runtime"
      ref={sectionRef}
      className="runtime-chapter"
      aria-labelledby="runtime-title"
    >
      <div className="chapter-inner" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <h2 id="runtime-title" style={{ color: 'var(--runtime-ink)', marginBottom: '12px' }}>
          Selected builds, shipped and live.
        </h2>
        <p style={{ color: 'var(--runtime-muted)', marginBottom: '48px', maxWidth: '50ch' }}>
          Five independent applications. Each one is deployed and each one solved a different kind of problem.
        </p>
      </div>

      {projects.map((project, index) => (
        <ProjectSlide key={project.slug} project={project} index={index} />
      ))}
    </section>
  );
}
