'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { personal, principles, processStages, journey, socials, education, capabilities, foundations, projects, storyCopy, portfolioCopy } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { ArrowDownIcon, ArrowUpRightIcon, ArrowRightIcon } from '@/components/icons';
import { FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { Button } from '@/components/ui/button';

export function Process() {
  const ref = useEditorialReveal();
  return <section id="process" ref={ref} className="process-section section-space" data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '15%', right: '8%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(219, 184, 120, 0.65), transparent 70%)' }} aria-hidden="true" />
    <header className="section-heading"><h2><AnimatedText>{portfolioCopy.process}</AnimatedText></h2><p data-reveal>{personal.ownership}</p></header>
    <div className="process-composition">
      <div className="process-document glass-panel" data-spatial="panel">
        <span className="document-tab">The development loop</span>
        <div className="process-orbit" aria-hidden="true">
          <span data-parallax="45" data-plane="1" data-spatial="chip" data-dir="1">plan</span>
          <span data-parallax="-30" data-plane="-1" data-spatial="chip" data-dir="-1">{'{ build }'}</span>
          <span data-parallax="24" data-plane="1" data-spatial="chip" data-dir="1">verify</span>
        </div>
        <p>{storyCopy.testing}</p>
      </div>
      <ol className="process-steps" data-flow>
        <span className="process-track" aria-hidden="true"><span data-wire="vertical"/></span>
        {processStages.map((stage,i)=><li key={stage.title}>
          <span className="process-index" aria-hidden="true">0{i+1}</span>
          <div><h3><AnimatedText>{stage.title}</AnimatedText></h3><p data-reveal>{stage.body}</p><span className="process-question" data-reveal>{stage.question}</span></div>
        </li>)}
      </ol>
    </div>
    <section id="capabilities" className="capabilities">
      <h3><AnimatedText>{storyCopy.capabilitiesTitle}</AnimatedText></h3>
      <div className="capability-list" data-spatial="stagger-3d">{capabilities.map((item,i)=><article key={item.title} data-spatial="card"><span aria-hidden="true">0{i+1}</span><h4>{item.title}</h4><p>{item.body}</p></article>)}</div>
    </section>
    <div className="principles"><h3><AnimatedText>Principles I work by.</AnimatedText></h3><dl data-spatial="stagger-3d">{principles.map(item=><div key={item.title} data-spatial="card"><dt>{item.title}</dt><dd>{item.line}</dd></div>)}</dl></div>
  </section>;
}

export function Journey() {
  const ref = useEditorialReveal();
  return <section id="journey" ref={ref} className="journey-section section-space" data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '20%', right: '10%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(220, 201, 144, 0.65), transparent 70%)' }} aria-hidden="true" />
    <header className="section-heading"><p className="section-index">05 / Education & growth</p><h2><AnimatedText>{portfolioCopy.education}</AnimatedText></h2><p data-reveal>{storyCopy.foundationsBody}</p></header>
    <div className="education-degrees" data-spatial="stagger-3d">{education.map((item,i)=><article key={item.title} data-spatial="card"><span className="degree-number" aria-hidden="true">0{i+1}</span><Image src="/brainware-university-logo.svg" alt="Brainware University" width={48} height={48} className="university-logo" priority={false}/><div><span className="degree-date">{item.date}</span><h3>{item.title}</h3><p>{item.institution}</p></div><ArrowUpRightIcon aria-hidden="true"/></article>)}</div>
    <ol className="education-timeline" data-flow><span className="education-track" aria-hidden="true"><span data-wire/></span>{journey.map(entry=><li key={entry.date}><span className="timeline-dot" aria-hidden="true"/><span className="education-year"><AnimatedText>{entry.date}</AnimatedText></span><div data-reveal><h3>{entry.title}</h3><p>{entry.body}</p></div></li>)}</ol>
    <div className="foundations"><h3><AnimatedText>{storyCopy.foundationsTitle}</AnimatedText></h3><ul data-stagger>{foundations.map(item=><li key={item}>{item}</li>)}</ul></div>
  </section>;
}

export function Contact() {
  const ref = useEditorialReveal();
  const [copied, setCopied] = useState(false);
  const [copyState, setCopyState] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    clearTimeout(timer.current);
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(personal.email);
        success = true;
      }
    } catch {}
    if (!success) {
      try {
        const input = document.createElement('textarea');
        input.value = personal.email;
        input.style.position = 'fixed';
        input.style.left = '-9999px';
        input.style.top = '-9999px';
        document.body.appendChild(input);
        input.focus();
        input.select();
        success = document.execCommand('copy');
        input.remove();
      } catch {}
    }
    if (success) {
      setCopied(true);
      setCopyState('Email copied.');
      timer.current = setTimeout(() => { setCopied(false); setCopyState(''); }, 4500);
    } else {
      setCopyState('Copy unavailable. Select the email address or use the email link.');
      timer.current = setTimeout(() => setCopyState(''), 5000);
    }
  };
  return <footer id="contact" ref={ref} className="contact-section section-space" data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '15%', right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(148, 196, 168, 0.75), transparent 70%)' }} aria-hidden="true" />
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '15%', left: '8%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(232, 168, 122, 0.7), transparent 70%)' }} aria-hidden="true" />
    <div className="footer-orbit-chips" aria-hidden="true">
      <span className="footer-chip footer-chip-1" data-parallax="55" data-plane="1" data-spatial="chip" data-dir="1">⚡ Full-Stack &amp; AI</span>
      <span className="footer-chip footer-chip-2" data-parallax="-45" data-plane="-1" data-spatial="chip" data-dir="-1">&lt;ShipToProduction /&gt;</span>
      <span className="footer-chip footer-chip-3" data-parallax="35" data-drift>const ready = true;</span>
      <span className="footer-chip footer-chip-4" data-parallax="-30" data-plane="1" data-spatial="chip" data-dir="1">Brainware Univ · 2024</span>
    </div>
    <div className="footer-connection"><h2><AnimatedText>{storyCopy.footer.flowTitle}</AnimatedText></h2><FlowLine steps={storyCopy.footer.flow}/></div>
    <div className="contact-main">
      <div className="contact-invite">
        <div className="availability-badge" data-reveal><span className="availability-dot" aria-hidden="true"/><span className="availability-text">Available for full-time engineering roles · 2026</span></div>
        <h2><AnimatedText>{portfolioCopy.contact}</AnimatedText></h2><p data-reveal>{storyCopy.footer.body}</p>
        <a className="contact-email" href={'mailto:'+personal.email}>{personal.email}<ArrowUpRightIcon aria-hidden="true"/></a>
        <div className="contact-tools">
          <Button className={'copy-email ' + (copied ? 'copied' : '')} variant="outline" onClick={copyEmail} aria-live="polite">
            {copied ? 'Copied! ✓' : 'Copy email'}
          </Button>
          <a href={personal.resume} download className="text-link">Download resume<ArrowDownIcon aria-hidden="true"/></a>
        </div>
        <p className="copy-status" role="status">{copyState}</p>
        <nav aria-label="Contact links" className="contact-socials" data-stagger>{socials.map(link=><a key={link.label} href={link.url} target={link.label==='Email'?undefined:'_blank'} rel={link.label==='Email'?undefined:'noopener noreferrer'}>{link.label}<ArrowUpRightIcon aria-hidden="true"/></a>)}</nav>
      </div>
      <div className="source-index glass-panel" data-depth="panel" data-spatial="panel">
        <div className="source-index-heading"><div><h3>{storyCopy.footer.sourceTitle}</h3><span className="source-count">05 Repositories</span></div><span aria-hidden="true">{'{ }'}</span></div>
        <ul data-stagger>{projects.map(project=><li key={project.slug}><a href={project.repo} target="_blank" rel="noopener noreferrer"><span className="source-branch" aria-hidden="true">↳</span><div><strong>{project.name}</strong><span>{project.techStack.slice(0,3).join(' · ')}</span></div><ArrowUpRightIcon aria-hidden="true"/></a></li>)}</ul>
        <a className="text-link" href="#projects">View projects<ArrowRightIcon aria-hidden="true"/></a>
      </div>
    </div>
    <div className="footer-person glass-panel" data-reveal data-spatial="card">
      <div className="footer-avatar-wrap">
        <Image src="/biswodip.png" alt="Biswodip Goj" width={60} height={75} className="footer-avatar"/>
        <span className="avatar-status-dot" title="Active developer" aria-hidden="true"/>
      </div>
      <div>
        <strong>{personal.name}</strong>
        <span className="footer-role-chip">{personal.role}</span>
      </div>
      <p>{personal.tagline}</p>
    </div>
    <div className="footer-signature" aria-hidden="true"><span data-parallax="40" data-drift>{storyCopy.footer.signature}</span></div>
    <div className="contact-colophon">
      <span>{storyCopy.footer.credit}</span>
      <span>{personal.location}</span>
      <a href="#opening" className="back-to-top" aria-label="Back to top of page">Back to top<ArrowUpRightIcon aria-hidden="true"/></a>
    </div>
  </footer>;
}
