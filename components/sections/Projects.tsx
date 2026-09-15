'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, type Project } from '@/lib/data';
import { useExperience } from '../ExperienceProvider';
import styles from './Projects.module.css';

const bookend = '/previews/showcase-bookend.webp';
const storyOrder = ['Erpixa', 'TelePoint', 'Tripmate', 'NanoLink', 'Nexora'];
const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5Ij48cGF0aCBmaWxsPSIjNDQ0IiBkPSJNMCAwaDE2djlIMHoiLz48L3N2Zz4=';
const stories = [
  ['BUSINESS MANAGEMENT, FINALLY WITHOUT THE BLOAT.', 'Erpixa — a modular ERP platform that activates only what your business actually needs.'],
  ['REAL-TIME COMMUNICATION, REIMAGINED.', 'TelePoint — instant, friction-free connection built for speed.'],
  ['PLAN JOURNEYS THAT FEEL EFFORTLESS.', 'Tripmate — turning scattered ideas into a clear, beautiful itinerary.'],
  ['SHORTEN ANY LINK. SHARE IT ANYWHERE.', 'NanoLink — password protection, expiry, burn-after-read, and real click analytics.'],
  ['PLAN THE WORK. WATCH IT MOVE. FINISH IT TOGETHER.', 'Nexora — a calm command center for planning, tracking, and shipping work together.'],
];

type Panel = { headline: string; subtext: string; image: string; project?: Project };
const panels: Panel[] = [
  { headline: 'GOOD IDEAS. GREAT SOFTWARE.', subtext: 'I build products end to end — from the first wireframe to a deployed, used-in-the-wild application.', image: bookend },
  ...storyOrder.map((name, i) => {
    const project = projects.find(p => p.name === name)!;
    return { headline: stories[i][0], subtext: stories[i][1], image: project.previewImage!, project };
  }),
  { headline: 'THE BEST STORIES START WHEN YOU SHIP.', subtext: "Have an idea worth building? Let's take it all the way.", image: bookend },
];

// Equal holds with a shared crossfade window on either side of each boundary.
function panelOpacity(progress: number, index: number) {
  const position = progress * panels.length;
  const enter = index === 0 ? 1 : (position - index + 0.25) / 0.5;
  const exit = index === panels.length - 1 ? 1 : (index + 1 + 0.25 - position) / 0.5;
  return Math.max(0, Math.min(1, enter, exit));
}

function StoryPanel({ panel, index, progress, pinned, active, animated, inView }: {
  panel: Panel; index: number; progress: MotionValue<number>; pinned: boolean;
  active: number; animated: boolean; inView: boolean;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const opacity = useTransform(progress, value => panelOpacity(value, index));
  const y = useTransform(opacity, [0, 1], [24, 0]);
  const captionOpacity = useTransform(opacity, [0, 0.1, 1], [0, 0, 1]);
  const [visible, setVisible] = useState(index === 0);
  useMotionValueEvent(opacity, 'change', value => setVisible(value > 0));
  const inactive = pinned && active !== index;
  const tabIndex = inactive ? -1 : undefined;
  const project = panel.project;

  useEffect(() => {
    if (inactive && articleRef.current?.contains(document.activeElement)) {
      document.getElementById('projects')?.focus({ preventScroll: true });
    }
  }, [inactive]);

  return (
    <motion.article
      ref={articleRef}
      className={styles.panel}
      data-panel={index + 1}
      aria-labelledby={`showcase-title-${index}`}
      aria-hidden={inactive || undefined}
      style={{ opacity: pinned ? opacity : 1, pointerEvents: inactive ? 'none' : 'auto' }}
    >
      {/* Background ambient layer for bookends only */}
      {!project && (
        <>
          <div className={styles.image} aria-hidden="true" data-playing={pinned && visible && animated && inView}>
            <Image
              src={panel.image}
              alt=""
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={blurDataURL}
              priority={index === 0}
              loading={index === 0 ? undefined : pinned && inView && index <= active + 1 ? 'eager' : 'lazy'}
            />
          </div>
          <div className={styles.scrim} aria-hidden="true" />
        </>
      )}

      {/* Main Editorial Container */}
      <motion.div
        className={styles.copy}
        data-layout={project ? 'split' : 'statement'}
        style={{ y: pinned ? y : 0 }}
        initial={false}
        whileInView={!pinned && animated ? { opacity: [0.4, 1], y: [20, 0] } : undefined}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {project ? (
          <div className={styles.splitGrid}>
            {/* Left Column: Typography & Action cluster */}
            <div className={styles.contentCol}>
              <div className={styles.metaRow}>
                <span className={styles.panelBadge}>CASE STUDY {String(index).padStart(2, '0')}</span>
                <span className={styles.dotSeparator} aria-hidden="true">·</span>
                <span className={styles.projectName}>{project.name}</span>
              </div>
              <h3 id={`showcase-title-${index}`}>{panel.headline}</h3>
              <motion.p className={styles.subtext} style={pinned ? { opacity: captionOpacity } : { opacity: 1 }}>
                {panel.subtext}
              </motion.p>
              <ul className={styles.tags} aria-label={`${project.name} technology stack`}>
                {(project.techStack?.length ? project.techStack : project.tags).map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className={styles.links}>
                <Link
                  href={`/project/${project.name.toLowerCase().replace(/ /g, '-')}`}
                  tabIndex={tabIndex}
                  aria-label={`Explore Details: ${project.name}`}
                  className={styles.primaryLink}
                >
                  Explore Details <span aria-hidden="true">→</span>
                </Link>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={tabIndex}
                  aria-label={`View live: ${project.name} (opens in a new tab)`}
                  className={styles.secondaryLink}
                >
                  View live <span aria-hidden="true">↗</span>
                </a>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={tabIndex}
                    aria-label={`View source: ${project.name} (opens in a new tab)`}
                    className={styles.secondaryLink}
                  >
                    View source <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Machined Browser Window Canvas (Zero collision) */}
            <div className={styles.mockupCol} aria-hidden="true">
              <div className={styles.browserWindow}>
                <div className={styles.browserHeader}>
                  <div className={styles.trafficControls}>
                    <span className={styles.trafficRed} />
                    <span className={styles.trafficYellow} />
                    <span className={styles.trafficGreen} />
                  </div>
                  <div className={styles.browserAddress}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span>{project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                  </div>
                  <span className={styles.browserPill}>PRODUCTION</span>
                </div>
                <div className={styles.browserCanvas} data-playing={pinned && visible && animated && inView}>
                  <Image
                    src={panel.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    priority={index === 1}
                    loading={index === 1 ? undefined : pinned && inView && index <= active + 1 ? 'eager' : 'lazy'}
                    className={styles.screenshotImg}
                  />
                  <div className={styles.canvasGlassShine} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Statement Panels (1: Intro, 7: Outro) */
          <div className={styles.statementBox}>
            <span className={styles.statementEyebrow}>
              {index === 0 ? '01 / 07 — PHILOSOPHY' : '07 / 07 — THE INVITATION'}
            </span>
            <h3 id={`showcase-title-${index}`}>{panel.headline}</h3>
            <motion.p className={styles.subtext} style={pinned ? { opacity: captionOpacity } : { opacity: 1 }}>
              {panel.subtext}
            </motion.p>
            {index === panels.length - 1 && (
              <div className={styles.statementActions}>
                <a className={styles.cta} href="#contact" tabIndex={tabIndex}>
                  Let&apos;s talk <span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.article>
  );
}

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { animated, paused } = useExperience();
  const [desktop, setDesktop] = useState(false);
  const [reading, setReading] = useState(false);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const pinned = desktop && !paused && !reading;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', value => setActive(Math.min(panels.length - 1, Math.floor(value * panels.length))));

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (min-height: 760px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className={styles.showcase} data-pinned={pinned}>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.stage}>
          <header className={styles.heading}>
            <h2 id="projects-title">03 / Selected Builds</h2>
            <div>
              {pinned && (
                <button
                  type="button"
                  onClick={() => {
                    setReading(true);
                    requestAnimationFrame(() => {
                      const section = document.getElementById('projects');
                      section?.focus({ preventScroll: true });
                      section?.scrollIntoView({ block: 'start', behavior: 'instant' });
                    });
                  }}
                >
                  Read without motion
                </button>
              )}
              <a href="#journey" data-skip>Skip section</a>
            </div>
          </header>

          {panels.map((panel, index) => (
            <StoryPanel
              key={panel.headline}
              {...{ panel, index, pinned, active, inView }}
              animated={animated && !reading}
              progress={scrollYProgress}
            />
          ))}

          {pinned && (
            <div className={styles.progress} aria-hidden="true">
              <span>{String(active + 1).padStart(2, '0')} / 07</span>
              <div><motion.div style={{ scaleX: scrollYProgress }} /></div>
              <span>Scroll to explore</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
