'use client';

import { useState, useEffect } from 'react';
import Icon from './ui/Icon';
import { github, personal } from '@/lib/data';
import { AudioEngine } from './ui/AudioFeedback';

const links = [
  { id: 'hero', label: 'Introduction' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tools & systems' },
  { id: 'projects', label: 'Selected builds' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    AudioEngine.init();
    setIsAudioActive(!AudioEngine.isMuted());
  }, []);

  function toggleAudio() {
    const muted = !AudioEngine.isMuted();
    AudioEngine.setMuted(muted);
    setIsAudioActive(!muted);
    if (!muted) AudioEngine.playChime();
  }

  return (
    <footer className="relative border-t border-slate-400/30 bg-[#263f57] text-slate-200">
      <div className="section-shell py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="min-w-0">
            <a href="#hero" className="inline-flex min-h-11 items-center text-xl font-semibold text-slate-50">{personal.name}</a>
            <p className="mt-3 max-w-sm !text-sm !text-slate-200">{personal.role}. Interfaces, APIs, databases and deployment.</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a href={github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 focus-visible:outline-cyan-200">GitHub <Icon name="arrowUpRight" /></a>
              <a href={`mailto:${personal.email}`} className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 focus-visible:outline-cyan-200">Email <Icon name="arrowUpRight" /></a>
            </div>
          </div>
          <nav aria-label="Footer navigation" className="min-w-0">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 text-sm md:grid-cols-1">
              {links.map(link => <li key={link.id}><a href={`#${link.id}`} className="inline-flex min-h-11 items-center hover:underline focus-visible:outline-cyan-200">{link.label}</a></li>)}
            </ul>
          </nav>
          <div className="min-w-0 text-sm">
            <p className="!text-sm !text-slate-200">{personal.location}</p>
            <button type="button" onClick={toggleAudio} aria-pressed={isAudioActive} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-400/50 px-4 text-sm text-slate-100 hover:bg-slate-600 focus-visible:outline-cyan-200">
              Sound effects <span className="font-semibold">{isAudioActive ? 'on' : 'off'}</span>
            </button>
            <a href="#hero" className="mt-4 flex min-h-11 w-fit items-center gap-2 underline underline-offset-4 focus-visible:outline-cyan-200">Back to top <Icon name="arrowUp" /></a>
          </div>
        </div>
        <p aria-hidden="true" className="mt-12 !text-[clamp(2.2rem,9vw,6rem)] !font-semibold !leading-[1.1] !tracking-[-0.04em] !text-slate-100">BISWODIP GOJ</p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-400/30 pt-6 text-sm">
          <span>&copy; {new Date().getFullYear()} {personal.name}</span>
          <span>Built with Next.js, TypeScript and Three.js.</span>
        </div>
      </div>
    </footer>
  );
}
