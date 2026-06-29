'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { nav, personal } from '@/lib/data';
import { scrollToSection } from '@/components/SmoothScroll';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function go(id: string) {
    setOpen(false);
    scrollToSection(id);
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass-strong' : 'glass'
        }`}
      >
        <button
          onClick={() => go('hero')}
          className="group flex items-center gap-2.5 pl-1 pr-3"
          aria-label="Back to top"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-xl text-white">
            <span
              className="absolute inset-0 rounded-xl animate-gradient-pan"
              style={{
                backgroundImage: 'linear-gradient(135deg,#22d3ee,#8b5cf6,#f472b6)',
                backgroundSize: '200% 200%',
              }}
            />
            <span className="relative font-display text-sm font-extrabold">BG</span>
          </span>
          <span className="hidden font-display text-sm font-bold tracking-tight text-ink sm:block">
            {personal.firstName}
            <span className="text-gradient"> Goj</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="relative rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-ink"
            >
              {active === n.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: 'rgba(139,92,246,0.14)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {n.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go('contact')}
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white sm:block"
            style={{ background: 'linear-gradient(110deg,#3b82f6,#8b5cf6)' }}
          >
            Hire me
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full glass-strong md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 w-[92%] max-w-sm rounded-3xl glass-strong p-3 md:hidden"
          >
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-base font-medium text-slate-700 hover:bg-white/60"
              >
                {n.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
