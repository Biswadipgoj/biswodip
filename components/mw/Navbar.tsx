'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { scrollToSection } from '@/components/SmoothScroll';
import { brand, nav } from '@/lib/data';

/**
 * Floating glass navigation (design screen 1a). Sticks to the top and deepens
 * its shadow once the page scrolls. Nav links jump to the in-page showcases.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <nav
        className="glass mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-4 rounded-full pl-5 pr-2 sm:pl-6"
        style={{
          boxShadow: scrolled
            ? '0 22px 50px -22px rgba(76,29,149,.5)'
            : '0 18px 40px -22px rgba(76,29,149,.4)',
          transition: 'box-shadow .3s ease',
        }}
      >
        <a href="#top" className="flex items-center gap-3">
          <Logo size={34} />
          <span
            className="font-display text-[17px] font-semibold tracking-[-.01em]"
            style={{ color: 'var(--ink)' }}
          >
            {brand.name}
          </span>
        </a>

        <div
          className="hidden items-center gap-8 text-[15px] font-semibold lg:flex"
          style={{ color: 'var(--text)' }}
        >
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item === 'Analytics' ? 'dashboard' : 'workspace')}
              className="transition-colors hover:text-[color:var(--violet-700)]"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="hidden items-center gap-2 rounded-full px-[15px] py-2 sm:inline-flex"
            style={{ background: 'rgba(22,163,74,.12)', border: '1px solid rgba(22,163,74,.25)' }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: '#16A34A', boxShadow: '0 0 0 4px rgba(22,163,74,.18)' }}
            />
            <span className="text-[14px] font-bold" style={{ color: '#15803D' }}>
              Store open
            </span>
          </span>
          <button
            onClick={() => scrollToSection('signin')}
            className="rounded-full px-5 py-2.5 text-[14px] font-bold text-white"
            style={{
              background: 'var(--aurora)',
              boxShadow: '0 14px 30px -12px rgba(124,58,237,.6)',
            }}
          >
            Sign in
          </button>
        </div>
      </nav>
    </div>
  );
}
