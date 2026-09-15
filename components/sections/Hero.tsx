'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { personal, heroCopy, projects } from '@/lib/data';
import Icon from '../ui/Icon';

const featuredProject = projects.find(project => project.name === 'NanoLink') ?? projects[0];
const Computer3D = dynamic(() => import('../ui/Computer3D'), {
  ssr: false,
  loading: () => (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-700">
      {featuredProject.previewImage && <Image src={featuredProject.previewImage} alt={`${featuredProject.name} interface preview`} fill priority sizes="(min-width: 981px) 600px, 90vw" className="object-contain" />}
    </div>
  ),
});

export default function Hero() {
  const [stageMode, setStageMode] = useState<'3d' | 'preview'>('3d');

  return (
    <section id="hero" aria-labelledby="hero-title" className="hero section-shell spatial-stage !py-10 min-[981px]:!py-9" style={{ width: 'min(1240px, calc(100% - 40px))' }}>
      <div className="hero-grid !min-h-0 !gap-8 min-[981px]:!grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] min-[1100px]:!gap-12">
        <div className="hero-copy">
          <p className="hero-name !mb-4">{personal.name}</p>
          <h1 id="hero-title" className="!text-[clamp(2.3rem,4.2vw,3.6rem)] !leading-[1.08] !tracking-[-0.035em]">
            {heroCopy.headline.map((line, index) => (
              <span className={`line !overflow-visible ${index === 1 ? 'text-[var(--accent-2)]' : ''}`} key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-description !mt-5 !text-base !leading-7">{heroCopy.description}</p>
          <div className="actions !mt-6">
            <a className="btn-primary" href="#projects">{heroCopy.projectCta} <Icon name="arrowUpRight" /></a>
            <a className="text-link" href="#contact">{heroCopy.contactCta} <Icon name="arrowUpRight" /></a>
          </div>
          <div className="hero-meta !mt-6 !gap-x-4 !gap-y-2" aria-label="Areas of work">
            {heroCopy.chips.map(chip => <span className="text-sm text-[var(--ink-2)]" key={chip}>{chip}</span>)}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div role="group" aria-label="Workspace view" className="inline-flex gap-1 rounded-xl border border-slate-400/40 bg-slate-700 p-1 text-sm text-slate-100">
              {(['3d', 'preview'] as const).map(mode => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={stageMode === mode}
                  aria-controls="hero-workspace"
                  onClick={() => setStageMode(mode)}
                  className={`inline-flex min-h-11 items-center rounded-lg px-4 focus-visible:outline-cyan-200 ${stageMode === mode ? 'bg-cyan-200 font-semibold text-slate-900' : 'text-slate-100 hover:bg-slate-600'}`}
                >
                  {mode === '3d' ? '3D workspace' : 'Project image'}
                </button>
              ))}
            </div>
            <span className="text-sm text-[var(--ink-2)]">{featuredProject.name}</span>
          </div>
          <div id="hero-workspace" className="relative h-[300px] min-[480px]:h-[380px] min-[981px]:h-[min(430px,52svh)]">
            {stageMode === '3d' && featuredProject.previewImage ? (
              <Computer3D image={featuredProject.previewImage} label={featuredProject.name} />
            ) : featuredProject.previewImage ? (
              <Image src={featuredProject.previewImage} alt={`${featuredProject.name} interface preview`} fill priority sizes="(min-width: 981px) 600px, 90vw" className="rounded-xl object-contain" />
            ) : null}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
            <p className="!text-sm">Existing project screenshot, not a live session.</p>
            <Link href={`/project/${featuredProject.name.toLowerCase().replace(/ /g, '-')}`} className="text-link !min-h-11">
              Explore {featuredProject.name} <Icon name="arrowUpRight" />
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-rail !mt-7 !pt-3 !tracking-normal">
        <span>{heroCopy.rail}</span>
        <a href="#about" className="min-h-11">A little context <Icon name="arrowDown" /></a>
      </div>
    </section>
  );
}
