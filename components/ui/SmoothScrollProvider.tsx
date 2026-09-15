'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useExperience } from '../ExperienceProvider';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { animated, spatial } = useExperience();
  const engine = useRef<Lenis | null>(null);
  const wakeEngine = useRef<(() => void) | null>(null);
  const motionEnabled = useRef(false);
  useEffect(() => {
    motionEnabled.current = animated;
    if (!animated) window.scrollTo({ top: window.scrollY, behavior: 'instant' });
  }, [animated]);

  useEffect(() => {
    // Touch, reduced-motion and paused experiences use the browser's native scroll.
    if (!spatial) return;
    const lenis = new Lenis({ duration: 0.65, smoothWheel: true, anchors: false, autoRaf: false });
    engine.current = lenis;
    let frame = 0;
    const tick = (time: number) => {
      frame = 0;
      if (document.hidden) return;
      lenis.raf(time);
      if (lenis.isScrolling === 'smooth') frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (frame || document.hidden) return;
      // Idle time is not animation time. Prime the clock before resuming.
      lenis.time = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const unsubscribe = lenis.on('virtual-scroll', wake);
    wakeEngine.current = wake;
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
      engine.current = null;
      wakeEngine.current = null;
      lenis.destroy();
    };
  }, [spatial]);

  useEffect(() => {
    let frame = 0;
    const navigate = (hash: string, immediate: boolean) => {
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const target = id ? document.getElementById(id) : document.getElementById('hero');
      if (!target) return;
      cancelAnimationFrame(frame);
      // Wait for the mobile menu to close before measuring the sticky header.
      frame = requestAnimationFrame(() => {
        const header = document.querySelector('.site-header');
        const offset = (header?.getBoundingClientRect().height ?? 0) + 16;
        const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
        const temporaryFocus = !target.hasAttribute('tabindex');
        if (temporaryFocus) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (temporaryFocus) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        if (engine.current) {
          engine.current.scrollTo(top, { immediate, force: true });
          wakeEngine.current?.();
        } else {
          window.scrollTo({ top, behavior: 'instant' });
        }
      });
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, '', url.hash);
      navigate(url.hash, anchor.classList.contains('skip-link') || anchor.hasAttribute('data-skip') || /skip/i.test(anchor.textContent ?? ''));
    };
    const restore = () => navigate(location.hash, true);
    // Lenis-aware programmatic scroll for sections that move the page themselves.
    const scrollApi = (top: number, immediate = false) => {
      if (!Number.isFinite(top)) return;
      if (engine.current) {
        engine.current.scrollTo(top, { immediate, force: true });
        wakeEngine.current?.();
      } else {
        window.scrollTo({ top, behavior: immediate || !motionEnabled.current ? 'instant' : 'smooth' });
      }
    };
    (window as unknown as { __portfolioScrollTo?: typeof scrollApi }).__portfolioScrollTo = scrollApi;
    document.addEventListener('click', click);
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    if (location.hash) restore();
    return () => {
      cancelAnimationFrame(frame);
      if ((window as unknown as { __portfolioScrollTo?: unknown }).__portfolioScrollTo === scrollApi) {
        delete (window as unknown as { __portfolioScrollTo?: unknown }).__portfolioScrollTo;
      }
      document.removeEventListener('click', click);
      window.removeEventListener('popstate', restore);
      window.removeEventListener('hashchange', restore);
    };
  }, []);
  return <>{children}</>;
}
