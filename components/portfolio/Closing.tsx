'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
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
  const [activeTab, setActiveTab] = useState<'nanolink' | 'erpixa' | 'tripmate' | 'e2e' | 'contact'>('nanolink');
  const [copied, setCopied] = useState(false);

  const terminalTabs = {
    nanolink: {
      cmd: 'cat src/app/api/links/route.ts',
      label: '01 NanoLink: Ingress Route Handler',
      output: `// Ingress payload validation via strict Zod schema
const payload = LinkSchema.safeParse(await req.json());
if (!payload.success) return ProblemDetails.fromZod(payload.error); // RFC 7807

const shortCode = nanoid(7); // Collision-resistant base62
const link = await prisma.link.create({
  data: { ...payload.data, shortCode }, // ACID transactional write
});
return NextResponse.json({ shortCode, url: link.originalUrl }, { status: 201 });`,
    },
    erpixa: {
      cmd: 'cat supabase/schema.sql | grep -A 8 "ROW LEVEL SECURITY"',
      label: '02 Erpixa: PostgreSQL RLS Kernel Isolation',
      output: `-- Multi-tenant isolation at PostgreSQL storage engine
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON accounts
  FOR ALL
  USING (org_id = current_setting('request.jwt.claim.org_id', true)::uuid)
  WITH CHECK (org_id = current_setting('request.jwt.claim.org_id', true)::uuid);
-- Enforces cryptographic tenant containment with zero application-layer leaks.`,
    },
    tripmate: {
      cmd: 'cat src/lib/graph-settlement.ts',
      label: '03 Tripmate: Minimum-Cash-Flow Solver',
      output: `// Reduces N-party debt graph from O(N²) quadratic web to O(N) linear transactions
export function simplifyDebtGraph(balances: Map<string, number>): Array<{ from: string; to: string; amount: number }> {
  // Iteratively pair maximum net creditor with maximum net debtor
  const creditors = getPositiveBalances(balances); // Max heap
  const debtors   = getNegativeBalances(balances); // Min heap
  return matchDebts(creditors, debtors); // Minimal atomic settlements
}`,
    },
    e2e: {
      cmd: 'npx playwright test tests/e2e/nanolink.spec.ts',
      label: '04 Verification: Live PostgreSQL E2E Suite',
      output: `Running 4 tests using 4 workers against live containerized PostgreSQL:
  ✔ [chromium] › nanolink.spec.ts:14:5 › Ingress Zod boundary rejects invalid URI (8ms)
  ✔ [chromium] › nanolink.spec.ts:28:5 › Valid payload creates short link & returns HTTP 201 (18ms)
  ✔ [chromium] › nanolink.spec.ts:42:5 › Edge redirect evaluates atomic counter increment (24ms)
  ✔ [chromium] › nanolink.spec.ts:58:5 › One-time burn link invalidates token after first access (14ms)
  4 passed (420ms)`,
    },
    contact: {
      cmd: 'sde.contact()',
      label: '05 Contact: Initialize SDE Collaboration',
      output: `Principal Engineer Inquiries & Senior Roles:
● Email: biswadipgoj@gmail.com
● Degree: B.Tech Computer Science & Engineering (MAKAUT 2021–2024)
● Experience: 60+ Production Architectures Deployed
● Location: Uluberia, West Bengal, India
● Status: Available for full-stack engineering and distributed systems roles.`,
    },
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer id="contact" ref={ref} className="contact-section" data-environment="sky">
      <div className="contact-container">
        <header className="contact-header" data-reveal>
          <span className="contact-eyebrow">PRODUCTION SYSTEMS ARCHITECTURE · FULL-STACK ENGINEERING</span>
          <h2>Full Architectural Ownership.<br />From Database Kernel to Client Viewport.</h2>
          <p className="contact-intro-p">
            Computer Science &amp; Engineering graduate (MAKAUT B.Tech CSE) with 60+ shipped production systems across distributed web platforms, cross-platform Android applications, and machine learning pipelines.
            I design and ship the full lifecycle: compile-time TypeScript invariant boundaries, typed API ingress gateways, PostgreSQL relational schemas with Row-Level Security, and automated Playwright E2E verification suites.
          </p>
        </header>

        {/* Real Software Architecture Terminal */}
        <div className="system-inspector" data-reveal>
          <div className="inspector-toolbar">
            <span className="inspector-tag">SYSTEM SOURCE &amp; VERIFICATION INSPECTOR</span>
            <div className="inspector-tabs" role="tablist" aria-label="System Architecture Inspector">
              {(Object.keys(terminalTabs) as Array<keyof typeof terminalTabs>).map(key => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === key}
                  className={`inspector-tab ${activeTab === key ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {terminalTabs[key].label}
                </button>
              ))}
            </div>
          </div>
          <div className="inspector-console">
            <div className="console-prompt-line">
              <span className="console-prompt-symbol">$</span>
              <span className="console-command">{terminalTabs[activeTab].cmd}</span>
            </div>
            <pre className="console-output"><code>{terminalTabs[activeTab].output}</code></pre>
          </div>
        </div>

        {/* Editorial Composition: Engineer Identity & Verified Production Scope */}
        <div className="contact-editorial-row" data-reveal>
          <div className="contact-identity-column">
            <figure className="contact-portrait-frame">
              <Image
                src="/biswodip.png"
                alt="Biswodip Goj — Full-Stack Software Engineer"
                fill
                sizes="(max-width: 799px) 90vw, 360px"
              />
            </figure>
            <div className="contact-credentials-block">
              <strong>{personal.name}</strong>
              <span className="credential-role">{personal.role}</span>
              <p className="credential-degree">
                B.Tech in Computer Science &amp; Engineering<br />
                Maulana Abul Kalam Azad University of Technology (2021–2024)
              </p>
              <p className="credential-diploma">
                Diploma in Computer Science &amp; Technology<br />
                West Bengal State Council of Technical Education (2018–2021)
              </p>
              <span className="credential-location">{personal.location}</span>
            </div>
          </div>

          <div className="contact-action-column">
            <div className="contact-action-card">
              <span className="action-card-label">DIRECT INQUIRIES &amp; SENIOR ROLES</span>
              <h3>Let&apos;s build reliable, deterministic software systems.</h3>
              <p>Available for senior software engineering roles, distributed systems, and mission-critical full-stack architecture.</p>
              
              <div className="contact-email-action-row">
                <a className="contact-email-link" href={`mailto:${personal.email}`}>
                  {personal.email}
                  <ArrowUpRightIcon aria-hidden="true" />
                </a>
                <button type="button" onClick={copyEmail} className="copy-btn">
                  {copied ? '✓ Copied' : 'Copy Email'}
                </button>
              </div>

              <div className="contact-social-links">
                <a href="https://github.com/Biswodipgoj" target="_blank" rel="noopener noreferrer">
                  GitHub (@Biswodipgoj · 60+ Repositories)<ArrowUpRightIcon aria-hidden="true" />
                </a>
                <a href="https://linkedin.com/in/biswodipgoj" target="_blank" rel="noopener noreferrer">
                  LinkedIn (Biswodip Goj)<ArrowUpRightIcon aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Colophon & Back to Top */}
        <div className="contact-colophon" data-reveal>
          <div className="colophon-left">
            <span>Architected &amp; Engineered by Biswodip Goj</span>
            <span>Next.js 15 App Router · React 18 · TypeScript 5 · GSAP ScrollTrigger · Lenis</span>
          </div>
          <a href="#opening" className="back-to-top">Back to top<ArrowUpRightIcon aria-hidden="true" /></a>
        </div>
        <div className="contact-signature" aria-hidden="true">biswodip<span>.</span></div>
      </div>
    </footer>
  );
}

