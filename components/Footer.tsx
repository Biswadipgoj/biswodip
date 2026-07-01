'use client';

import { personal, nav, socials } from '@/lib/data';
import { scrollToSection } from '@/components/SmoothScroll';

export default function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-12 pt-16">
      <div className="glass rounded-3xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <div className="font-display text-2xl font-extrabold tracking-tight">
              {personal.firstName}
              <span className="text-gradient"> Goj</span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-slate-500">{personal.tagline}</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollToSection(n.id)}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-ink"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full glass-strong text-xs font-semibold text-slate-600 transition-transform hover:-translate-y-0.5"
                aria-label={s.label}
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} {personal.name}. Crafted with code & color.</span>
          <span>Next.js · Three.js · GSAP · Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
