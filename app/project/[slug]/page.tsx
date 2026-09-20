import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, personal, projectSchemas, projectCodeSnippets } from '@/lib/data';
import { CodeWindow, FlowLine, ProjectActions, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons';

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.name + ' | ' + personal.name,
    description: project.description,
    alternates: { canonical: '/project/' + project.slug },
    openGraph: {
      title: project.name + ' | ' + personal.name,
      description: project.blurb,
      images: [{ url: project.previewImage, width: 1440, height: 900 }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  const theme = {
    '--chapter-bg': project.chapter.bg,
    '--chapter-ink': project.chapter.ink,
    '--chapter-accent': project.chapter.accent,
  } as CSSProperties;

  const schema = projectSchemas[slug] || [];
  const code = projectCodeSnippets[slug];

  return (
    <div className="project-detail" style={theme}>
      <a className="skip-link" href="#project-content">Skip to content</a>
      <header className="detail-nav">
        <Link className="wordmark" href="/">biswodip<span>.</span></Link>
        <Link className="text-link" href="/#projects">← All projects<ArrowRightIcon aria-hidden="true" /></Link>
      </header>

      <main id="project-content">
        <header className="detail-heading">
          <div className="detail-meta">
            <span className="detail-chapter-tag">{project.chapter.index} / {project.chapter.label}</span>
            {project.role && <span className="detail-role-badge">{project.role}</span>}
          </div>
          <h1>{project.name}</h1>
          <p>{project.blurb}</p>
          <ProjectActions project={project} detail />
        </header>

        {/* Business Analysis & Operational Friction Briefing */}
        {(project.problem || project.result) && (
          <section className="detail-briefing glass-panel" aria-label="Project briefing">
            {project.problem && (
              <div className="briefing-box">
                <span className="briefing-label">01 / The Problem &amp; Analysis</span>
                <p>{project.problem}</p>
              </div>
            )}
            {project.role && (
              <div className="briefing-box">
                <span className="briefing-label">02 / Engineering &amp; BA Role</span>
                <p>{project.role}</p>
              </div>
            )}
            {project.result && (
              <div className="briefing-box">
                <span className="briefing-label">03 / Verified Outcome</span>
                <p>{project.result}</p>
              </div>
            )}
          </section>
        )}

        <section className="detail-section overview">
          <h2>Overview</h2>
          <div>
            <p className="detail-description">{project.description}</p>
            <h3>What I built</h3>
            <p>{project.technicalNote}</p>
          </div>
        </section>

        <section className="detail-product">
          <h2>Product Interface</h2>
          <ProjectMedia project={project} priority />
        </section>

        <section className="detail-section">
          <h2>Engineering Decisions</h2>
          <div className="decision-list">
            {project.decisions.map(decision => (
              <article key={decision.title}>
                <h3>{decision.title}</h3>
                <dl>
                  <div><dt>What</dt><dd>{decision.what}</dd></div>
                  <div><dt>Why</dt><dd>{decision.why}</dd></div>
                  <div><dt>How</dt><dd>{decision.how}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h2>Data Architecture &amp; Schema</h2>
          <div>
            <p>{project.data}</p>
            {schema.length > 0 && (
              <dl className="detail-schema">
                {schema.map(([name, type]) => (
                  <div key={name}>
                    <dt><code>{name}</code></dt>
                    <dd>{type}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        <section className="detail-section">
          <h2>API &amp; System Workflow</h2>
          <div>
            <p>{project.api}</p>
            <FlowLine steps={project.chapter.flow} />
            <p className="flow-note">End-to-end system lifecycle</p>
          </div>
        </section>

        {code && (
          <section className="detail-source">
            <h2>Representative Implementation</h2>
            <p>{code.label}. Contiguous excerpt from the verified repository source.</p>
            <CodeWindow lines={code.lines} file={code.file} label={code.label} />
            <a className="text-link" href={code.sourceUrl} target="_blank" rel="noopener noreferrer">
              Read file on GitHub<ArrowUpRightIcon aria-hidden="true" />
            </a>
          </section>
        )}

        <section className="detail-section">
          <h2>Interface &amp; Features</h2>
          <div>
            <p>{project.interface}</p>
            <ul className="interface-details">
              {project.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="detail-section">
          <h2>Technology Stack</h2>
          <div>
            <ul className="detail-stack">
              {project.techStack.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <p className="engineering-details">{project.engineering.join(' · ')}</p>
          </div>
        </section>

        <section className="detail-evidence">
          <div>
            <h2>Source Repositories</h2>
            <a className="text-link" href={project.repo} target="_blank" rel="noopener noreferrer">
              Open GitHub repository<ArrowUpRightIcon aria-hidden="true" />
            </a>
            <div className="source-references">
              {project.evidence.map(source => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label}<ArrowUpRightIcon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2>Live Deployment</h2>
            <a className="action" href={project.url} target="_blank" rel="noopener noreferrer">
              Run {project.name}<ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
        </section>

        <nav className="other-projects" aria-label="Other projects">
          {projects.filter(item => item.slug !== slug).map(item => (
            <Link href={'/project/' + item.slug} key={item.slug}>
              {item.name}<ArrowUpRightIcon aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </main>
      <footer className="detail-footer">
        <span>{personal.name} · {personal.role}</span>
        <a href={'mailto:' + personal.email}>{personal.email}</a>
      </footer>
    </div>
  );
}

