'use client';
import { useEffect, useRef, useState } from 'react';
import { nav, personal } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { MenuIcon, XmarkIcon, ArrowUpRightIcon } from '@/components/icons';

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sections = nav.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const update = () => {
      let active = sections[0];
      for (const section of sections) if (section.getBoundingClientRect().top <= 180) active = section;
      root.current?.querySelectorAll<HTMLAnchorElement>('[data-nav]').forEach(link => {
        if (link.dataset.nav === active?.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      const scene = document.elementFromPoint(window.innerWidth - 8, 100)?.closest<HTMLElement>('[data-environment]');
      if (scene && root.current) root.current.style.setProperty('--nav-bg', getComputedStyle(scene).backgroundColor);
    };
    const observer = new IntersectionObserver(update, { rootMargin: '-80px 0px -65% 0px', threshold: [0, 0.1] });
    sections.forEach(section => observer.observe(section));
    // Observer updates chapter state without a React render on every scroll frame.
    const onHash = () => { setOpen(false); update(); };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('scroll', update, { passive: true });

    // Connect to Lenis smooth scroll instance if initialized
    const win = window as unknown as { portfolioScroll?: { on?: (ev: string, cb: () => void) => void; off?: (ev: string, cb: () => void) => void } };
    if (win.portfolioScroll?.on) {
      win.portfolioScroll.on('scroll', update);
    }

    update();
    return () => { 
      observer.disconnect(); 
      window.removeEventListener('hashchange', onHash); 
      window.removeEventListener('scroll', update);
      if (win.portfolioScroll?.off) {
        win.portfolioScroll.off('scroll', update);
      }
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header ref={root} className="portfolio-nav">
      <a className="wordmark" href="#opening" aria-label={`${personal.name}, home`}>biswodip<span className="wordmark-dot">.</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{nav.map(item => <a key={item.id} data-nav={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav>
      <div className="mobile-nav-actions"><a href="#projects">Work</a><a href="#contact">Contact</a><Button ref={trigger} variant="ghost" size="icon" className="menu-button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <XmarkIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}</Button></div>
      <a className="nav-email" href={`mailto:${personal.email}`} aria-label="Email Biswodip"><ArrowUpRightIcon aria-hidden="true" /></a>
      <nav id="mobile-navigation" aria-label="More navigation" className="mobile-navigation" hidden={!open}>{nav.map(item => <a key={item.id} data-nav={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>{item.label}</a>)}</nav>
    </header>
  </>;
}
