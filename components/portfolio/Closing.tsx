'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { personal, principles, processStages, journey, socials, education, capabilities, foundations, projects, storyCopy } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon, ArrowRightIcon } from '@/components/icons';
import { FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { Button } from '@/components/ui/button';

export function Process() {
  const ref = useEditorialReveal();
  return <section id="process" ref={ref} className="process-section section-space">
    <header className="section-heading" data-reveal="clip">
      <h2 data-split>{storyCopy.processTitle}</h2>
      <p data-reveal>{personal.maturity}</p>
    </header>
    <div className="process-composition">
      <div className="process-document glass-panel" data-reveal="3d-flip" data-tilt-3d data-scroll-3d>
        <span className="document-tab" data-reveal="blur">requirement → application</span>
        <h3 data-reveal>Start with<br /><em>the workflow.</em></h3>
        <div className="document-path" data-stagger>
          {processStages.map(stage => <span key={stage.title} className="glass-pill" style={{padding: '8px 12px', borderRadius: '8px', marginBottom: '6px'}}>{stage.artifact}<ArrowDownIcon aria-hidden="true"/></span>)}
        </div>
        <p data-reveal="blur">{storyCopy.testing}</p>
      </div>
      <ol className="process-steps">
        {processStages.map((stage, i) => <li key={stage.title} className="glass-panel" data-reveal={i % 2 === 0 ? 'left' : 'right'} data-tilt-3d data-scroll-3d style={{padding: '28px', borderRadius: '14px', marginBottom: '20px'}}>
          <span className="process-index" data-index-reveal>{String(i+1).padStart(2,'0')}</span>
          <div>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
            <span className="process-question" data-reveal="blur">{stage.question}</span>
          </div>
        </li>)}
      </ol>
    </div>
    <section id="capabilities" className="capabilities" data-fade-section>
      <h3 data-reveal="rotate">{storyCopy.capabilitiesTitle}</h3>
      <div className="capability-list" data-stagger>
        {capabilities.map(item => <article key={item.title} className="glass-panel" data-reveal="3d-depth" data-tilt-3d data-scroll-3d style={{padding: '24px', borderRadius: '12px', marginBottom: '16px'}}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </article>)}
      </div>
    </section>
    <div className="principles" data-fade-section>
      <h3 data-reveal="right">Principles I work by</h3>
      <dl data-stagger>
        {principles.map(item => <div key={item.title} className="glass-panel" data-reveal="3d-flip" data-tilt-3d data-scroll-3d style={{padding: '24px', borderRadius: '12px', marginBottom: '16px'}}>
          <dt>{item.title}</dt>
          <dd>{item.line}</dd>
        </div>)}
      </dl>
    </div>
  </section>;
}

export function Journey() {
  const ref = useEditorialReveal();
  return <section id="journey" ref={ref} className="journey-section section-space">
    <header className="section-heading" data-reveal="clip">
      <h2 data-split>Education &amp;<br /><em>the journey so far.</em></h2>
      <p data-reveal>{storyCopy.foundationsBody}</p>
    </header>
    <div className="education-degrees" data-stagger>
      {education.map(item => <article key={item.title} className="glass-panel" data-reveal="3d-depth" data-tilt-3d data-scroll-3d style={{padding: '28px', borderRadius: '14px'}}>
        <span data-reveal="blur">{item.date} · {item.institution}</span>
        <h3>{item.title}</h3>
      </article>)}
    </div>
    <div className="foundations" data-fade-section>
      <h3 data-reveal="right">{storyCopy.foundationsTitle}</h3>
      <ul data-stagger style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        {foundations.map(item => <li key={item} className="glass-pill" data-reveal="scale" style={{padding: '8px 16px', borderRadius: '24px'}}>{item}</li>)}
      </ul>
    </div>
    <ol className="education-timeline">
      {journey.map((entry, i) => <li key={entry.date} className="glass-panel" data-reveal={i % 2 === 0 ? 'left' : 'right'} data-tilt-3d data-scroll-3d style={{padding: '24px', borderRadius: '14px', marginBottom: '20px'}}>
        <span className="education-year" data-reveal="rotate">{entry.date}</span>
        <div>
          <h3>{entry.title}</h3>
          <p>{entry.body}</p>
        </div>
      </li>)}
    </ol>
  </section>;
}

export function Contact() {
  const ref = useEditorialReveal();
  const [copyState, setCopyState] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copyEmail = async () => {
    clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(personal.email); setCopyState('Email copied.'); }
    catch { setCopyState('Copy unavailable. Select the email address or use the email link.'); }
    timer.current = setTimeout(() => setCopyState(''), 5000);
  };

  return <footer id="contact" ref={ref} className="contact-section section-space">
    <div className="footer-connection" data-reveal="clip">
      <h2 data-reveal="blur">{storyCopy.footer.flowTitle}</h2>
      <FlowLine steps={storyCopy.footer.flow}/>
    </div>
    <div className="contact-main">
      <div className="contact-invite glass-panel" data-reveal="left" data-tilt-3d data-scroll-3d style={{padding: '36px', borderRadius: '18px'}}>
        <h2 data-split>Let&apos;s build<br /><em>something useful.</em></h2>
        <p data-reveal>{storyCopy.footer.body}</p>
        <a className="contact-email" href={'mailto:'+personal.email} data-reveal="scale">
          {personal.email}<ArrowUpRightIcon aria-hidden="true"/>
        </a>
        <div className="contact-tools" data-stagger>
          <span data-magnetic><Button className="copy-email" variant="outline" onClick={copyEmail}>Copy email</Button></span>
          <span data-magnetic><a href={personal.resume} download className="text-link">Download resume<ArrowDownIcon aria-hidden="true"/></a></span>
        </div>
        <p className="copy-status" role="status">{copyState}</p>
        <nav aria-label="Contact links" className="contact-socials" data-stagger>
          {socials.map(link => <span key={link.label} data-magnetic><a href={link.url} target={link.label==='Email'?undefined:'_blank'} rel={link.label==='Email'?undefined:'noopener noreferrer'}>{link.label}<ArrowUpRightIcon aria-hidden="true"/></a></span>)}
        </nav>
      </div>
      <div className="source-index glass-panel" data-reveal="right" data-tilt-3d data-scroll-3d style={{borderRadius: '18px'}}>
        <div className="source-index-heading" data-reveal="blur">
          <h3>{storyCopy.footer.sourceTitle}</h3>
          <span aria-hidden="true">{'{ }'}</span>
        </div>
        <ul data-stagger>
          {projects.map(project => <li key={project.slug}>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <span className="source-branch" aria-hidden="true">↳</span>
              <div><strong>{project.name}</strong><span>{project.techStack.slice(0,3).join(' · ')}</span></div>
              <ArrowUpRightIcon aria-hidden="true"/>
            </a>
          </li>)}
        </ul>
        <span data-magnetic><a className="text-link" href="#projects" data-reveal>View projects<ArrowRightIcon aria-hidden="true"/></a></span>
      </div>
    </div>
    <div className="footer-person glass-panel" data-reveal="3d-depth" data-tilt-3d data-scroll-3d style={{padding: '24px 32px', borderRadius: '16px'}}>
      <Image src="/biswodip.png" alt="Biswodip Goj" width={72} height={88} style={{borderRadius: '10px', objectFit: 'cover'}}/>
      <div><strong>{personal.name}</strong><span>{personal.role}</span></div>
      <p>{personal.tagline}</p>
    </div>
    <div className="footer-signature" data-reveal="clip" aria-hidden="true">{storyCopy.footer.signature}</div>
    <div className="contact-colophon" data-reveal="blur">
      <span>{storyCopy.footer.credit}</span>
      <span>{personal.location}</span>
      <span data-magnetic><a href="#opening">Back to top<ArrowUpRightIcon aria-hidden="true"/></a></span>
    </div>
  </footer>;
}
