'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processStages, journey, personal, socials } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────────────────────
   Process Pipeline — horizontal bar that fills on scroll
   ──────────────────────────────────────────────────────────────── */

function ProcessPipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    if (!sectionRef.current || !fillRef.current) return;

    if (reduceMotion) {
      gsap.set(fillRef.current, { scaleX: 1 });
      setActiveStage(processStages.length - 1);
      return;
    }

    const ctx = gsap.context(() => {
      // Pipeline fill
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            onUpdate: (self) => {
              const stage = Math.min(
                processStages.length - 1,
                Math.floor(self.progress * processStages.length)
              );
              setActiveStage(stage);
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={sectionRef} className="pipeline-section">
      <h2 style={{ marginBottom: '8px' }}>From requirement to running software.</h2>
      <p style={{ color: 'var(--deploy-ink-muted)', maxWidth: '45ch' }}>
        A working engineering approach, described honestly.
      </p>

      {/* Pipeline track */}
      <div className="pipeline-track">
        <div
          ref={fillRef}
          className="pipeline-fill"
          style={{ transform: reduceMotion ? 'scaleX(1)' : 'scaleX(0)' }}
        />
      </div>

      {/* Stages */}
      <div className="pipeline-stages">
        {processStages.map((stage, i) => (
          <div
            key={stage.title}
            className="pipeline-stage"
            data-active={i <= activeStage}
          >
            <div className="pipeline-stage-dot" />
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Journey — git log style timeline
   ──────────────────────────────────────────────────────────────── */

function JourneyLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="journey-section">
      <h2 style={{ marginBottom: '32px' }}>From diploma fundamentals to real builds.</h2>
      <div className="git-log">
        {journey.map((entry, i) => (
          <motion.div
            key={entry.date}
            className="git-entry"
            data-current={entry.current || false}
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: reduceMotion ? 0 : i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="git-date mono">{entry.date}</span>
            <h3>{entry.title}</h3>
            <p>{entry.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Contact — final "Build complete" status
   ──────────────────────────────────────────────────────────────── */

function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="deploy-contact"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Build complete status */}
      <div className="build-complete mono">
        <span className="checkmark">✓</span>
        <span>Build complete. Ready to ship.</span>
      </div>

      <h2>{`Let\u2019s build something that ships.`}</h2>
      <p style={{ maxWidth: '55ch' }}>
        A full-stack build, a frontend problem, an API, a database-backed application or an internal tool — tell me what you are trying to build.
      </p>

      <div className="contact-actions">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target={social.label !== 'Email' ? '_blank' : undefined}
            rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
            className={social.label === 'Email' ? 'contact-btn' : 'contact-btn-ghost'}
          >
            {social.label}
            {social.label !== 'Email' && <span aria-hidden="true">↗</span>}
          </a>
        ))}
      </div>

      <div style={{ marginTop: '24px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--deploy-ink-muted)' }}>
          {personal.location} · I typically respond within 24 hours.
        </p>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   DEPLOYED — Main chapter container
   ──────────────────────────────────────────────────────────────── */

export default function DeployedSection() {
  return (
    <section id="deployed" className="deploy-chapter" aria-labelledby="deployed-title">
      <div className="chapter-inner">
        <ProcessPipeline />
        <JourneyLog />
        <ContactSection />
      </div>
    </section>
  );
}
