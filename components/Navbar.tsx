'use client';
import Icon from './ui/Icon';

import { useEffect, useRef, useState } from 'react';
import { nav, personal } from '@/lib/data';
import { useExperience } from './ExperienceProvider';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { paused, toggle } = useExperience();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-20% 0px -55% 0px' });
    nav.forEach(link => { const section = document.getElementById(link.id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpen(false); };
    window.addEventListener('keydown', escape); window.addEventListener('pointerdown', outside);
    return () => { window.removeEventListener('keydown', escape); window.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <header className="site-header" ref={headerRef}>
    <div className="header-inner">
      <a href="#hero" className="wordmark" aria-label={`${personal.firstName.toLowerCase()}. Home`}><span className="brand-mark" aria-hidden="true">b.</span><span>biswodip<span className="brand-period">.</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.filter(link => ['projects', 'about', 'skills', 'github'].includes(link.id)).map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? 'location' : undefined}>{link.label}</a>)}</nav>
      <div className="header-actions">
        <button type="button" className="motion-switch" onClick={toggle} aria-pressed={paused} aria-label={paused ? 'Enable motion (respects system preference)' : 'Pause motion'}><Icon name={paused ? 'play' : 'pause'} /><span>Motion</span></button>
        <a className="header-contact" href="#contact">Let’s talk <Icon name="arrowUpRight" /></a>
        <button ref={toggleRef} type="button" className="menu-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-nav">{open ? 'Close' : 'Menu'} <Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </div>
    {open && <nav id="mobile-nav" aria-label="Mobile navigation">{nav.map((link, i) => <a key={link.id} href={`#${link.id}`} style={{ '--i': i } as React.CSSProperties} aria-current={active === link.id ? 'location' : undefined} onClick={() => setOpen(false)}>{link.label}<Icon name="arrowUpRight" /></a>)}</nav>}
  </header>;
}
