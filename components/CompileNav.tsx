'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'telepoint', label: 'TelePoint' },
  { id: 'nanolink', label: 'NanoLink' },
  { id: 'work', label: 'Fleet' },
  { id: 'process', label: 'Process' },
  { id: 'rigor', label: 'Rigor & Stats' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export default function CompileNav() {
  const [activeChapter, setActiveChapter] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapter(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="editorial-nav-container">
      <nav className="editorial-nav" aria-label="Main Navigation">
        {/* Brand identity pill with mini avatar */}
        <a href="#home" className="nav-brand-pill" title="Biswodip Goj">
          <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
            <Image
              src="/biswodip.png"
              alt="Biswodip Goj"
              fill
              className="object-cover object-top"
            />
          </div>
          <span>Biswodip</span>
        </a>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeChapter === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Quick Dropdown / Jump */}
        <div className="flex md:hidden items-center gap-1">
          <a
            href="#about"
            className={`nav-link-btn ${activeChapter === 'about' ? 'active' : ''}`}
          >
            About
          </a>
          <a
            href="#work"
            className={`nav-link-btn ${activeChapter === 'work' ? 'active' : ''}`}
          >
            Work
          </a>
          <a
            href="#contact"
            className={`nav-link-btn ${activeChapter === 'contact' ? 'active' : ''}`}
          >
            Contact
          </a>
        </div>

        {/* Non-negotiable Recruiter Shortcut: Skip to Work */}
        <a href="#work" className="nav-skip-work" title="Jump straight to projects">
          Work ↓
        </a>
      </nav>
    </div>
  );
}
