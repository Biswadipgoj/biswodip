'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  personal,
  principles,
  processStages,
  journey,
  socials,
  education,
  foundations,
  projects,
  storyCopy,
  portfolioCopy,
  engineeringEvidence,
  engineeringDecisions
} from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { ArrowDownIcon, ArrowUpRightIcon, ArrowRightIcon } from '@/components/icons';
import { FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { Button } from '@/components/ui/button';

export function Process() {
  const ref = useEditorialReveal();
  return (
    <section id="process" ref={ref} className="process-section section-space" data-motion-root>
      <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '15%', right: '8%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(219, 184, 120, 0.65), transparent 70%)' }} aria-hidden="true" />
      <header className="section-heading">
        <p className="section-index">04 / How I Engineer</p>
        <h2><AnimatedText>{storyCopy.processTitle}</AnimatedText></h2>
        <p data-reveal>{personal.ownership}</p>
      </header>

      {/* From Requirement to Production Lifecycle */}
      <div className="lifecycle-panel glass-panel" data-spatial="panel">
        <span className="document-tab">From Requirement to Production</span>
        <p className="lifecycle-sub">Translating real operational workflows into verified, deployed software systems.</p>
        <FlowLine steps={[
          "Requirement",
          "Workflow",
          "Data Model",
          "API",
          "Interface",
          "Validation",
          "Testing",
          "Deployment",
          "Iteration"
        ]} />
      </div>

      <div className="process-composition">
        <ol className="process-steps" data-flow>
          <span className="process-track" aria-hidden="true"><span data-wire="vertical"/></span>
          {processStages.map((stage) => (
            <li key={stage.title}>
              <span className="process-index" aria-hidden="true">{stage.step}</span>
              <div>
                <span className="stage-phase">{stage.phase}</span>
                <h3><AnimatedText>{stage.title}</AnimatedText></h3>
                <p data-reveal>{stage.body}</p>
                <span className="process-evidence" data-reveal>Verification: {stage.evidence}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Engineering Evidence Section (#capabilities preserves test selector) */}
      <section id="capabilities" className="engineering-evidence-section">
        <header className="sub-section-heading">
          <p className="section-index">Demonstrated Competency</p>
          <h3><AnimatedText>{storyCopy.evidenceTitle}</AnimatedText></h3>
          <p>{storyCopy.evidenceSub}</p>
        </header>
        <div className="engineering-evidence-grid" data-spatial="stagger-3d">
          {engineeringEvidence.map((ev, i) => (
            <article key={ev.domain} className="evidence-card glass-panel" data-spatial="card">
              <div className="evidence-card-header">
                <span className="evidence-num">0{i + 1}</span>
                <h4>{ev.domain}</h4>
              </div>
              <p className="evidence-summary">{ev.summary}</p>
              <ul className="evidence-items">
                {ev.items.map((item, itemIdx) => (
                  <li key={item} data-spatial="chip" data-dir={itemIdx % 2 === 0 ? 1 : -1}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Engineering Decisions Section */}
      <section id="decisions" className="engineering-decisions-section">
        <header className="sub-section-heading">
          <p className="section-index">Technical Trade-Offs</p>
          <h3><AnimatedText>{storyCopy.decisionsTitle}</AnimatedText></h3>
          <p>{storyCopy.decisionsSub}</p>
        </header>
        <div className="engineering-decisions-grid" data-spatial="stagger-3d">
          {engineeringDecisions.map((dec) => (
            <article key={dec.decision} className="decision-card glass-panel" data-spatial="card">
              <div className="decision-meta">
                <span className="decision-project">{dec.project}</span>
                <span className="decision-context">{dec.context}</span>
              </div>
              <h4>{dec.decision}</h4>
              <p>{dec.reasoning}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="principles">
        <h3><AnimatedText>Principles I engineer by.</AnimatedText></h3>
        <dl data-spatial="stagger-3d">
          {principles.map((item) => (
            <div key={item.title} data-spatial="card">
              <dt>{item.title}</dt>
              <dd>{item.line}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Journey() {
  const ref = useEditorialReveal();
  return (
    <section id="journey" ref={ref} className="journey-section section-space" data-motion-root>
      <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '20%', right: '10%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(220, 201, 144, 0.65), transparent 70%)' }} aria-hidden="true" />
      <header className="section-heading">
        <p className="section-index">05 / Education & Background</p>
        <h2><AnimatedText>{portfolioCopy.education}</AnimatedText></h2>
        <p data-reveal>{storyCopy.foundationsBody}</p>
      </header>
      <div className="education-degrees" data-spatial="stagger-3d">
        {education.map((item, i) => (
          <article key={item.title} data-spatial="card">
            <span className="degree-number" aria-hidden="true">0{i + 1}</span>
            <Image src="/brainware-university-logo.svg" alt="Brainware University, Kolkata" width={48} height={48} className="university-logo" priority={false} />
            <div>
              <span className="degree-date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.institution}</p>
            </div>
            <ArrowUpRightIcon aria-hidden="true" />
          </article>
        ))}
      </div>
      <ol className="education-timeline" data-flow>
        <span className="education-track" aria-hidden="true"><span data-wire /></span>
        {journey.map((entry) => (
          <li key={entry.date}>
            <span className="timeline-dot" aria-hidden="true" />
            <span className="education-year"><AnimatedText>{entry.date}</AnimatedText></span>
            <div data-reveal>
              <h3>{entry.title}</h3>
              <p>{entry.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="foundations">
        <h3><AnimatedText>{storyCopy.foundationsTitle}</AnimatedText></h3>
        <ul data-stagger>
          {foundations.map((item, fi) => (
            <li key={item} data-spatial="chip" data-dir={fi % 2 === 0 ? 1 : -1}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contact() {
  const ref = useEditorialReveal();
  const [copied, setCopied] = useState(false);
  const [copyState, setCopyState] = useState('');
  const [activeCmd, setActiveCmd] = useState<'profile' | 'projects' | 'stack' | 'contact'>('profile');
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
      setCopyState('Email copied to clipboard.');
      timer.current = setTimeout(() => { setCopied(false); setCopyState(''); }, 4500);
    } else {
      setCopyState('Copy unavailable. Select the email address directly or click the mailto link.');
      timer.current = setTimeout(() => setCopyState(''), 5000);
    }
  };

  return (
    <footer id="contact" ref={ref} className="contact-section section-space" data-motion-root>
      <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '10%', right: '5%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(148, 196, 168, 0.8), transparent 70%)' }} aria-hidden="true" />
      <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '12%', left: '6%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(232, 168, 122, 0.75), transparent 70%)' }} aria-hidden="true" />

      <div className="footer-connection">
        <h2><AnimatedText>{storyCopy.footer.flowTitle}</AnimatedText></h2>
        <FlowLine steps={storyCopy.footer.flow} />
      </div>

      <div className="contact-main">
        <div className="contact-invite">
          <div className="availability-badge" data-reveal>
            <span className="availability-dot" aria-hidden="true" />
            <span className="availability-text">Open to Remote / Relocation · Full-Time Software Engineering</span>
          </div>
          <h2><AnimatedText>{storyCopy.footer.title}</AnimatedText></h2>
          <p className="contact-body" data-reveal>{storyCopy.footer.body}</p>
          <p className="contact-secondary-note" data-reveal>{storyCopy.footer.secondary}</p>

          <a className="contact-email" href={'mailto:' + personal.email}>
            {personal.email}
            <ArrowUpRightIcon aria-hidden="true" />
          </a>

          <div className="contact-tools">
            <Button className={'copy-email ' + (copied ? 'copied' : '')} variant="outline" onClick={copyEmail} aria-live="polite">
              {copied ? 'Copied! ✓' : 'Copy email'}
            </Button>
            <a href={personal.resume} download className="action action-quiet">
              Download resume<ArrowDownIcon aria-hidden="true" />
            </a>
            <a href="https://github.com/Biswadipgoj" target="_blank" rel="noopener noreferrer" className="text-link">
              GitHub<ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
          <p className="copy-status" role="status">{copyState}</p>

          {/* Quick Engineering Inspector Deck */}
          <div className="terminal-deck glass-panel" data-spatial="panel" data-depth="panel">
            <div className="terminal-topbar">
              <div className="terminal-dots" aria-hidden="true">
                <span className="term-dot term-red" />
                <span className="term-dot term-yellow" />
                <span className="term-dot term-green" />
              </div>
              <span className="terminal-title">biswodip@workstation: ~</span>
              <span className="terminal-session">candidate-brief</span>
            </div>

            <div className="terminal-controls" role="toolbar" aria-label="Candidate brief inspection tabs">
              <button type="button" className={'term-pill ' + (activeCmd === 'profile' ? 'active' : '')} onClick={() => setActiveCmd('profile')} data-spatial="chip">
                profile
              </button>
              <button type="button" className={'term-pill ' + (activeCmd === 'projects' ? 'active' : '')} onClick={() => setActiveCmd('projects')} data-spatial="chip">
                shipped-work
              </button>
              <button type="button" className={'term-pill ' + (activeCmd === 'stack' ? 'active' : '')} onClick={() => setActiveCmd('stack')} data-spatial="chip">
                tech-summary
              </button>
              <button type="button" className={'term-pill ' + (activeCmd === 'contact' ? 'active' : '')} onClick={() => setActiveCmd('contact')} data-spatial="chip">
                hiring-info
              </button>
            </div>

            <div className="terminal-output" aria-live="polite">
              {activeCmd === 'profile' && (
                <div className="term-line">
                  <p className="term-res green-text">Engineer: {personal.name}</p>
                  <p className="term-res">Role: Full-Stack Software Engineer &amp; Systems Developer</p>
                  <p className="term-res">Experience: Freelance &amp; Contract Developer (Multiple Companies) · 60+ Shipped</p>
                  <p className="term-res">Training: Certified Industrial Training in ASP.NET Core 6.0 MVC (Logicrack Infosystem)</p>
                  <p className="term-res cyan-text">Education: B.Tech CSE (2024) &amp; Diploma CSE (2021) · Brainware University, Kolkata</p>
                </div>
              )}

              {activeCmd === 'projects' && (
                <div className="term-line">
                  <p className="term-res green-text">Track Record: 60+ software products &amp; systems shipped + client contract engineering</p>
                  <p className="term-res">Selected Open Architectures &amp; Source Repositories on GitHub:</p>
                  <p className="term-res">1. Erpixa · Multi-tenant business app with PostgreSQL RLS</p>
                  <p className="term-res">2. NanoLink · Next.js URL service with runtime Zod boundary validation</p>
                  <p className="term-res">3. TelePoint · Retail EMI platform with customer ownership checks</p>
                  <p className="term-res">4. Nexora · Cross-platform workspace (Web, Windows, Android)</p>
                  <p className="term-res">5. Tripmate · Settlement engine with greedy debt minimization</p>
                </div>
              )}

              {activeCmd === 'stack' && (
                <div className="term-line">
                  <p className="term-res green-text">Core: TypeScript, React, Next.js 15, Node.js, Python, C# (.NET), SQL</p>
                  <p className="term-res">Data &amp; In-Memory: PostgreSQL, Redis (Caching &amp; Rate Limiting), Prisma, Supabase, RLS</p>
                  <p className="term-res">Cloud &amp; DevOps: Kubernetes, Docker, Linux, NGINX, GitHub Actions CI/CD</p>
                  <p className="term-res">APIs &amp; Messaging: RESTful APIs, GraphQL, Apache Kafka, Zod Validation, Postman</p>
                </div>
              )}

              {activeCmd === 'contact' && (
                <div className="term-line">
                  <p className="term-res green-text">Email: biswadipgoj@gmail.com</p>
                  <p className="term-res">Location: {personal.location}</p>
                  <p className="term-res">Availability: Remote / Relocation</p>
                  <p className="term-res cyan-text">Status: Ready for technical interviews &amp; hiring discussions</p>
                </div>
              )}
            </div>
          </div>

          <nav aria-label="Contact links" className="contact-socials" data-stagger>
            {socials.map((link) => (
              <a key={link.label} href={link.url} target={link.label === 'Email' ? undefined : '_blank'} rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}>
                {link.label}
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <div className="source-index glass-panel" data-depth="panel" data-spatial="panel">
          <div className="source-index-heading">
            <div>
              <h3>{storyCopy.footer.sourceTitle}</h3>
              <span className="source-count">05 Verified Repositories</span>
            </div>
            <span className="repo-cube-badge" aria-hidden="true">⎇ main</span>
          </div>
          <ul data-stagger>
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="repo-card-link">
                  <span className="source-branch" aria-hidden="true">↳</span>
                  <div>
                    <strong>{project.name}</strong>
                    <span className="repo-tech-tag">{project.techStack.slice(0, 3).join(' · ')}</span>
                  </div>
                  <ArrowUpRightIcon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a className="text-link" href="#projects">
            View projects<ArrowRightIcon aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="footer-person glass-panel" data-reveal data-spatial="card">
        <div className="footer-avatar-wrap">
          <div className="avatar-beacon-halo" aria-hidden="true" />
          <Image src="/biswodip.png" alt="Biswodip Goj" width={64} height={80} className="footer-avatar" />
          <span className="avatar-status-dot" title="Active developer" aria-hidden="true" />
        </div>
        <div>
          <strong>{personal.name}</strong>
          <span className="footer-role-chip">{personal.role}</span>
        </div>
        <p>{personal.tagline}</p>
      </div>

      <div className="footer-signature" aria-hidden="true">
        <span data-parallax="40" data-drift>{storyCopy.footer.signature}</span>
      </div>

      <div className="contact-colophon">
        <span>{storyCopy.footer.credit}</span>
        <span>{personal.location}</span>
        <a href="#opening" className="back-to-top" aria-label="Back to top of page">
          Back to top<ArrowUpRightIcon aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

