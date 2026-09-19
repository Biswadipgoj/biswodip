'use client';
import Image from 'next/image';
import { personal, principles, processStages, journey, socials, engineeringScope } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import { FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function Process() {
  const ref = useEditorialReveal();
  return (
    <section id="process" ref={ref} className="process-section section-space" data-environment="lavender">
      <div className="process-introduction" data-reveal>
        <span className="small-label" style={{ color: 'var(--teal-accent, #38bdf8)' }}>ENGINEERING METHODOLOGY</span>
        <h2>Reliable Software<br /><em>is Architected, Not Discovered.</em></h2>
        <p>A deterministic lifecycle applied across 60+ projects: isolate requirements, establish the database invariants, model typed ingress contracts, and automate live verification.</p>
      </div>
      <div className="process-composition">
        <div className="process-document">
          <div className="document-tab">ARCHITECTURE_SPEC.md</div>
          <h3>Invariants &amp; Boundaries<br />Defined Before Code.</h3>
          <div className="requirement-lines">
            <span>What are the ACID transaction boundaries?</span>
            <span>What are the p99 latency &amp; concurrency limits?</span>
            <span>What are the failure modes &amp; rollbacks?</span>
          </div>
          <div className="document-build">
            <code>spec → relational schema → typed contracts</code>
            <ArrowDownIcon aria-hidden="true" />
            <code>deterministic build → automated E2E → release</code>
          </div>
          <p>Production metrics and query plans drive real architectural maturity.</p>
        </div>
        <ol className="process-steps">
          {processStages.map((stage, i) => (
            <li key={stage.title} data-reveal>
              <span className="process-index">0{i + 1}</span>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
                <code>{stage.artifact}</code>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="process-loop" data-reveal>
        <FlowLine steps={['System Design', 'PostgreSQL Schema', 'API Gateway', 'State Management', 'Docker CI/CD', 'Live Deployment', 'Telemetry', 'Optimization']} />
      </div>

      {/* Engineering Scope: 60+ Shipped Projects across 3 Computing Domains */}
      <div className="engineering-scope-container" id="capabilities" data-reveal>
        <div className="scope-header">
          <span className="small-label" style={{ color: 'var(--teal-accent, #38bdf8)' }}>PRODUCTION VOLUME</span>
          <h2>60+ Engineered Systems<br /><em>Across Three Computing Domains</em></h2>
          <p>Proven execution across distributed web architectures, native Android mobile applications, and machine learning pipelines.</p>
        </div>
        <div className="scope-grid">
          {engineeringScope.map(domain => (
            <div key={domain.category} className="scope-card" data-reveal>
              <span className="scope-count">{domain.count}</span>
              <h3>{domain.category}</h3>
              <p>{domain.description}</p>
              <div className="scope-tags">
                {domain.tags.map(tag => <span key={tag} className="scope-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="engineering-principles">
        {principles.map(principle => (
          <div key={principle.title} data-reveal>
            <span>{principle.title}</span>
            <h3>{principle.line}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Journey() {
  const ref = useEditorialReveal();
  return (
    <section id="journey" ref={ref} className="journey-section section-space" data-environment="cream">
      <header data-reveal>
        <span className="small-label" style={{ color: 'var(--teal-accent, #38bdf8)' }}>ACADEMIC &amp; ENGINEERING FOUNDATIONS</span>
        <h2>Computer Science Rigor.<br /><em>Proven by Execution.</em></h2>
        <p>Formal Computer Science &amp; Engineering education combined with 60+ production deployments.</p>
      </header>
      <ol className="education-timeline">
        {journey.map(entry => (
          <li key={entry.date} data-reveal>
            <span className="education-year">{entry.date}</span>
            <div>
              <h3>{entry.title}</h3>
              {'detail' in entry ? (
                <>
                  <p className="education-degree">{entry.detail.title}</p>
                  <p>{entry.detail.institution}</p>
                  <span className="education-subtitle">{entry.detail.subtitle}</span>
                  <Accordion type="single" collapsible className="coursework">
                    <AccordionItem value="subjects">
                      <AccordionTrigger>Engineering Coursework</AccordionTrigger>
                      <AccordionContent>
                        <ul>
                          {entry.detail.coursework.map(subject => <li key={subject}>{subject}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              ) : (
                <p>{entry.body}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Contact() {
  const ref = useEditorialReveal();
  return (
    <footer id="contact" ref={ref} className="contact-section" data-environment="sky">
      <div className="contact-portrait-composition">
        <div className="contact-person" data-reveal>
          <h2>One Engineer.<br /><em>Full Architectural Ownership.</em></h2>
          <p>{personal.name}<br />{personal.role} · 60+ Projects</p>
        </div>
        <figure className="contact-portrait" data-reveal>
          <Image src="/biswodip.png" alt="Biswodip Goj" fill sizes="(max-width: 799px) 88vw, 45vw" />
        </figure>
        <div className="contact-software-note" aria-hidden="true">
          <span>Relational Schema</span>
          <span>API Gateway</span>
          <span>Frontend State</span>
          <span>CI/CD Deployed</span>
        </div>
      </div>
      <div className="contact-details" data-reveal>
        <p>Available for senior software engineering roles and mission-critical system architecture.</p>
        <a className="contact-email" href={`mailto:${personal.email}`}>{personal.email}<ArrowUpRightIcon aria-hidden="true" /></a>
        <div className="contact-bottom">
          <span>{personal.location}</span>
          <nav aria-label="Social links">
            {socials.filter(social => social.label !== 'Email').map(social => (
              <a href={social.url} key={social.label} target="_blank" rel="noopener noreferrer">
                {social.label}<ArrowUpRightIcon aria-hidden="true" />
              </a>
            ))}
          </nav>
          <a href="#opening" className="back-to-top">Back to top<ArrowUpRightIcon aria-hidden="true" /></a>
        </div>
        <div className="contact-signature" aria-hidden="true">biswodip<span>.</span></div>
      </div>
    </footer>
  );
}

