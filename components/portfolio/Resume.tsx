'use client';
import Image from 'next/image';
import { personal, resumeCopy, experience, stack } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';

export default function Resume() {
  const ref = useEditorialReveal();
  return <section id="resume" ref={ref} className="resume-section section-space" data-motion-root aria-labelledby="resume-title">
    <header className="section-heading"><p className="section-index">06 / Resume</p><h2 id="resume-title">{resumeCopy.title}</h2><p>{resumeCopy.summary}</p></header>
    <div className="resume-layout">
      <div>
        <h3>{resumeCopy.experience}</h3>
        <ol className="resume-experience">{experience.map(item => <li key={item.organization} data-reveal>
          <p className="resume-period">{item.period}</p><h4>{item.role}</h4><p>{item.organization}</p>
          <ul>{item.highlights.filter(line => !line.includes('60+')).map(line => <li key={line}>{line}</li>)}</ul>
        </li>)}</ol>
        <details className="resume-skills"><summary>{resumeCopy.skills}</summary>{stack.map(group => <p key={group.title}><strong>{group.title}</strong><br/>{group.tools.join(' · ')}</p>)}</details>
      </div>
      <aside className="resume-download">
        <a href={personal.resume} target="_blank" rel="noopener noreferrer" aria-label="Open resume PDF preview"><Image src="/resume-preview.webp" alt="First page of Biswodip Goj’s resume" width={595} height={842} sizes="(max-width: 799px) 85vw, 32vw" /></a>
        <div className="resume-actions"><a href={personal.resume} download className="action">{resumeCopy.pdf}<ArrowDownIcon aria-hidden="true"/></a><a href={personal.resume} target="_blank" rel="noopener noreferrer" className="text-link">{resumeCopy.preview}<ArrowUpRightIcon aria-hidden="true"/></a></div>
      </aside>
    </div>
  </section>;
}

