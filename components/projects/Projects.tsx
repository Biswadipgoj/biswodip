'use client';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { projects, type Project } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { FlowLine, ProjectActions } from '@/components/cinematic/SoftwarePrimitives';
import { BrowserMockup } from '@/components/cinematic/BrowserMockup';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import NanoLinkScene from './NanoLinkScene';
import TelePointScene from './TelePointScene';

export function projectStyle(project: Project): CSSProperties {
  return { '--chapter-bg': project.chapter.bg, '--chapter-ink': project.chapter.ink, '--chapter-accent': project.chapter.accent } as CSSProperties;
}

function ProjectChapter({ project }: { project: Project }) {
  const ref = useEditorialReveal();
  const special = project.slug === 'nanolink' || project.slug === 'telepoint';
  return (
    <article ref={ref} id={project.slug} className={`project-chapter project-${project.slug}`} style={projectStyle(project)} data-environment={project.slug}>
      <header className="project-heading" data-reveal>
        <div>
          <h3>{project.name}<span className="project-index">/{project.chapter.index}</span></h3>
          <p>{project.blurb}</p>
        </div>
        <span className="project-category">{project.chapter.label}<ArrowDownIcon aria-hidden="true" /></span>
      </header>

      {/* Media: special scenes keep their GSAP scroll-chapter; others get browser animation */}
      {project.slug === 'nanolink'
        ? <NanoLinkScene project={project} />
        : project.slug === 'telepoint'
          ? <TelePointScene project={project} />
          : (
            <div className="compact-project-media" data-reveal>
              <BrowserMockup project={project} />
            </div>
          )
      }

      <div className="project-information" data-reveal>
        <div className="project-summary">
          <p>{project.description}</p>
          <ProjectActions project={project} />
        </div>
        <div className="project-facts">
          <div className="project-stack">
            <span>Built with</span>
            <p>{project.techStack.join(' · ')}</p>
          </div>
          {!special && (
            <ul className="project-feature-list">
              {project.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          )}
          {special && <p className="project-engineering">{project.technicalNote}</p>}
        </div>
      </div>

      {!special && (
        <div className="compact-flow">
          <FlowLine steps={project.chapter.flow} />
          <span>System Execution Flow</span>
        </div>
      )}

      <div className="project-transition" aria-hidden="true">
        <span>{project.name}</span>
        <span className="transition-thread" />
        <ArrowDownIcon />
      </div>
    </article>
  );
}

export default function Projects() {
  const ref = useEditorialReveal();
  return (
    <section id="projects" className="projects-section">
      <header ref={ref} className="work-introduction section-space" data-environment="cream">
        <div data-reveal>
          <span className="small-label" style={{ color: 'var(--teal-accent, #38bdf8)' }}>SELECTED FLAGSHIP ARCHITECTURES</span>
          <h2>Built. Shipped.<br /><em>60+ Systems Engineered.</em></h2>
          <p>Flagship production web systems, cross-platform Android mobile applications, and ML pipelines.<br />Explore the live deployments, database schemas, and source code below.</p>
        </div>
        <nav aria-label="Project index">
          {projects.map(project => (
            <Link href={`#${project.slug}`} key={project.slug}>
              <span>{project.chapter.index}</span>
              <strong>{project.name}</strong>
              <span>{project.chapter.label}</span>
              <ArrowUpRightIcon aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </header>

      <div>
        {projects.map(project => <ProjectChapter key={project.slug} project={project} />)}
      </div>
    </section>
  );
}

