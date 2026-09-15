'use client';
import Icon from './ui/Icon';

import { useEffect, useRef, useState } from 'react';
import { nav, personal } from '@/lib/data';
import { useExperience } from './ExperienceProvider';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { paused, animated, toggle } = useExperience();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const offset = (headerRef.current?.getBoundingClientRect().height ?? 84) + 32;
      let bestId = 'hero';
      let bestTop = -Infinity;
      for (const link of nav) {
        const section = document.getElementById(link.id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top <= offset && top > bestTop) {
          bestTop = top;
          bestId = section.id;
        }
      }
      setActive((prev) => (prev === bestId ? prev : bestId));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  useEffect(() => {
    const desktop = matchMedia('(min-width: 981px)');
    const close = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', close);
    return () => desktop.removeEventListener('change', close);
  }, []);
  useEffect(() => {
    if (!open) return;
    mobileNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener('keydown', escape); window.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', escape); window.removeEventListener('pointerdown', outside); };
  }, [open]);
  function selectSection(id: string) {
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  }

  return <header className="site-header" ref={headerRef} onBlur={event => {
    if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }}>
    <div className="header-inner">
      <a href="#hero" className="wordmark" aria-label={`${personal.firstName.toLowerCase()}. Home`}><span className="brand-mark" aria-hidden="true">b.</span><span>biswodip<span className="brand-period">.</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.filter(link => ['projects', 'about', 'skills', 'pipeline'].includes(link.id)).map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? 'location' : undefined}>{link.label}</a>)}</nav>
      <div className="header-actions">
        <button type="button" className="motion-switch" onClick={toggle} aria-pressed={paused} aria-label="Pause motion" title={paused ? 'Motion is off. System reduced-motion preferences are always respected.' : 'Pause decorative motion'}><Icon name={paused ? 'play' : 'pause'} /><span>Motion {paused ? 'off' : 'on'}</span></button>
        <a className="header-contact" href="#contact">Let’s talk <Icon name="arrowUpRight" /></a>
        <button ref={toggleRef} type="button" className="menu-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-nav">{open ? 'Close' : 'Menu'} <Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </div>
    {open && <nav ref={mobileNavRef} id="mobile-nav" data-lenis-prevent aria-label="Mobile navigation" style={{ position: 'absolute', inset: '100% 0 auto', maxHeight: 'calc(100svh - 84px)', overscrollBehavior: 'contain' }}>{nav.map(link => <a key={link.id} href={`#${link.id}`} style={{ animation: animated ? undefined : 'none' }} aria-current={active === link.id ? 'location' : undefined} onClick={() => selectSection(link.id)}>{link.label}<Icon name="arrowUpRight" /></a>)}</nav>}
  </header>;
}
