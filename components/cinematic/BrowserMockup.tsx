'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/data';

/**
 * BrowserMockup — scroll-triggered typing animation on the browser address bar,
 * followed by a loading bar, then the live project screenshot slides in.
 *
 * Animation sequence (on scroll enter):
 *   1. Browser chrome fades in
 *   2. URL types character-by-character (~40ms per char)
 *   3. Progress bar sweeps 0→100%
 *   4. Screenshot reveals with a slide-up + opacity
 */
export function BrowserMockup({ project }: { project: Project }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const shotRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);

  const fullUrl = new URL(project.url).hostname + new URL(project.url).pathname.replace(/\/$/, '');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reduce-motion: skip animation entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setTriggered(true);
      if (urlRef.current) urlRef.current.textContent = fullUrl;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runAnimation() {
    const urlEl = urlRef.current;
    const barEl = barRef.current;
    const shotEl = shotRef.current;
    const cursorEl = cursorRef.current;
    if (!urlEl || !barEl || !shotEl) return;

    // Capture non-null consts for closure safety
    const urlElSafe = urlEl;
    const barElSafe = barEl;
    const shotElSafe = shotEl;

    const chars = fullUrl.split('');
    let i = 0;
    urlElSafe.textContent = '';

    // Phase 1: type URL
    function typeNext() {
      if (i < chars.length) {
        urlElSafe.textContent += chars[i];
        i++;
        setTimeout(typeNext, 38 + Math.random() * 22);
      } else {
        // Phase 2: hide cursor, sweep loading bar
        if (cursorEl) cursorEl.style.opacity = '0';
        sweepBar();
      }
    }

    // Phase 2: loading bar sweep
    function sweepBar() {
      barElSafe.style.transition = 'transform 0ms';
      barElSafe.style.transform = 'scaleX(0)';
      barElSafe.style.opacity = '1';
      requestAnimationFrame(() => {
        barElSafe.style.transition = 'transform 820ms cubic-bezier(.4,0,.2,1)';
        barElSafe.style.transform = 'scaleX(1)';
        setTimeout(() => {
          barElSafe.style.transition = 'opacity 200ms';
          barElSafe.style.opacity = '0';
          // Phase 3: reveal screenshot
          revealShot();
        }, 850);
      });
    }

    // Phase 3: screenshot slide-up reveal
    function revealShot() {
      shotElSafe.style.transition = 'transform 700ms cubic-bezier(.22,1,.36,1), opacity 600ms ease';
      shotElSafe.style.transform = 'translateY(0)';
      shotElSafe.style.opacity = '1';
    }

    // Start typing after a brief delay
    setTimeout(typeNext, 280);
  }

  return (
    <div ref={rootRef} className="browser-mockup" aria-label={`${project.name} application screenshot`}>
      {/* Browser chrome */}
      <div className="browser-chrome">
        {/* Traffic lights */}
        <div className="browser-dots" aria-hidden="true">
          <span className="browser-dot browser-dot--red" />
          <span className="browser-dot browser-dot--yellow" />
          <span className="browser-dot browser-dot--green" />
        </div>
        {/* Address bar */}
        <div className="browser-address" aria-hidden="true">
          <span className="browser-lock">
            <svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="1" y="6" width="10" height="7" rx="1.5" fill="currentColor" opacity=".5" />
              <path d="M3.5 6V4a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity=".6" />
            </svg>
          </span>
          <span ref={urlRef} className="browser-url" />
          <span ref={cursorRef} className="browser-cursor" aria-hidden="true" />
        </div>
        {/* Loading bar */}
        <div className="browser-progress-track" aria-hidden="true">
          <span ref={barRef} className="browser-progress-bar" />
        </div>
      </div>
      {/* Screenshot area */}
      <div className="browser-viewport">
        <div
          ref={shotRef}
          className="browser-shot-wrap"
          style={{ transform: 'translateY(18px)', opacity: 0 }}
        >
          <Image
            src={project.previewImage}
            alt={`${project.name} live application`}
            fill
            sizes="(max-width: 799px) 100vw, 80vw"
            className="browser-shot"
          />
        </div>
      </div>
    </div>
  );
}
