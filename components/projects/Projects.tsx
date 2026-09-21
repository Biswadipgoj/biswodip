'use client';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { projects, storyCopy, portfolioCopy, type Project } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { ProjectActions, ProjectMedia, FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowUpRightIcon } from '@/components/icons';

export function projectStyle(project: Project): CSSProperties {
  return { '--chapter-bg': project.chapter.bg, '--chapter-ink': project.chapter.ink, '--chapter-accent': project.chapter.accent } as CSSProperties;
}

function ProjectChapter({project,index}: {project: Project;index: number}) {
  const ref = useEditorialReveal();
  const isNexora = project.slug === 'nexora';
  return <article ref={ref} id={project.slug} className={'project-chapter project-'+project.slug+' layout-split ' + (isNexora ? 'project-hero-preview' : 'project-compact-preview')} style={projectStyle(project)} data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '10%', right: index % 2 === 0 ? '5%' : '65%', width: 480, height: 480, background: 'radial-gradient(circle, color-mix(in srgb, var(--chapter-accent) 40%, transparent), transparent 70%)' }} aria-hidden="true" />
    <div className="chapter-meta" data-reveal>
      <span>{project.chapter.index} / {project.chapter.label}</span>
      <span className="chapter-status-pill">Featured Production System</span>
    </div>
    <div className="project-card" data-spatial="card">
      <Link className="project-visual" href={'/project/'+project.slug}>
        <div data-media><ProjectMedia project={project}/></div>
        <span className="screenshot-caption">
          <span className="caption-badge"><span className="caption-dot" aria-hidden="true"/>{isNexora ? 'Flagship cross-platform workspace' : 'Production interface'}</span>
          <span className="caption-action">Inspect architecture<ArrowUpRightIcon aria-hidden="true"/></span>
        </span>
      </Link>
      <header className="project-heading">
        <h3><Link href={'/project/'+project.slug}><AnimatedText>{project.name}</AnimatedText><ArrowUpRightIcon aria-hidden="true"/><span className="sr-only"> project details</span></Link></h3>
        <p data-reveal><AnimatedText>{project.whatItIs || project.blurb}</AnimatedText></p>
        <ul className="project-stack" data-stagger aria-label={project.name+' stack'}>{project.techStack.map((tech, ti)=><li key={tech} data-spatial="chip" data-dir={ti % 2 === 0 ? 1 : -1}>{tech}</li>)}</ul>
        <ProjectActions project={project} notes/>
      </header>
    </div>
    <div className="project-insight glass-panel recruiter-signal-panel" data-spatial="panel">
      <div className="recruiter-signal-grid">
        <div className="signal-item" data-spatial="card">
          <span className="signal-badge">01 · What It Is</span>
          <p className="signal-text">{project.whatItIs || project.blurb}</p>
        </div>
        <div className="signal-item" data-spatial="card">
          <span className="signal-badge">02 · Problem</span>
          <p className="signal-text">{project.problem}</p>
        </div>
        <div className="signal-item" data-spatial="card">
          <span className="signal-badge">03 · Engineering</span>
          <p className="signal-text">{project.engineeringSummary || project.technicalNote}</p>
        </div>
        <div className="signal-item" data-spatial="card">
          <span className="signal-badge">04 · Technical Evidence</span>
          <p className="signal-text">{project.technicalEvidence}</p>
        </div>
        <div className="signal-item highlight-result" data-spatial="card">
          <span className="signal-badge">05 · Verifiable Result</span>
          <p className="signal-text result-highlight">{project.result}</p>
        </div>
      </div>
      <div className="flow-container">
        <span className="flow-title">Verified Architecture Flow</span>
        <FlowLine steps={project.chapter.flow}/>
      </div>
    </div>
  </article>;
}

export default function Projects() {
  const ref = useEditorialReveal();
  return <section id="projects" ref={ref} className="projects-section" data-motion-root>
    <header className="projects-intro section-space">
      <p className="section-index">03 / Selected work</p>
      <h2><AnimatedText>{portfolioCopy.work}</AnimatedText><span className="project-total">(Selected Systems · 60+ Shipped)</span></h2>
      <div className="shipped-distinction-banner glass-panel" data-spatial="panel">
        <div className="shipped-badge-group">
          <span className="shipped-metric">60+</span>
          <span className="shipped-label">Products Shipped</span>
        </div>
        <div className="shipped-content">
          <p className="shipped-statement">
            <strong>60+ software products & systems shipped independently · featured architectures with full open source below.</strong>
          </p>
          <p className="shipped-description">{storyCopy.projectsIntro}</p>
        </div>
      </div>
      <nav aria-label="Featured projects" data-stagger>{projects.map((p, pi)=><a href={'#'+p.slug} key={p.slug} data-spatial="chip" data-dir={pi % 2 === 0 ? 1 : -1}><span>{p.chapter.index}</span>{p.name}<ArrowUpRightIcon aria-hidden="true"/></a>)}</nav>
    </header>
    {projects.map((project,i)=><ProjectChapter project={project} index={i} key={project.slug}/>)}
  </section>;
}

