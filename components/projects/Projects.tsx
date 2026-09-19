'use client';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { projects, type Project } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { FlowLine, ProjectActions, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import NanoLinkScene from './NanoLinkScene';
import TelePointScene from './TelePointScene';

export function projectStyle(project: Project): CSSProperties {
  return { '--chapter-bg': project.chapter.bg, '--chapter-ink': project.chapter.ink, '--chapter-accent': project.chapter.accent } as CSSProperties;
}
function ProjectChapter({ project }: { project: Project }) {
  const ref = useEditorialReveal();
  const special = project.slug === 'nanolink' || project.slug === 'telepoint';
  return <article ref={ref} id={project.slug} className={`project-chapter project-${project.slug}`} style={projectStyle(project)} data-environment={project.slug}>
    <header className="project-heading" data-reveal><div><h3>{project.name}<span className="project-index">/{project.chapter.index}</span></h3><p>{project.blurb}</p></div><span className="project-category">{project.chapter.label}<ArrowDownIcon aria-hidden="true" /></span></header>
    {project.slug === 'nanolink' ? <NanoLinkScene project={project} /> : project.slug === 'telepoint' ? <TelePointScene project={project} /> : <div className="compact-project-media" data-reveal><ProjectMedia project={project} /></div>}
    <div className="project-information" data-reveal><div className="project-summary"><p>{project.description}</p><ProjectActions project={project} /></div><div className="project-facts"><div className="project-stack"><span>Built with</span><p>{project.techStack.join(' · ')}</p></div>{!special && <ul className="project-feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}{special && <p className="project-engineering">{project.technicalNote}</p>}</div></div>
    {!special && <div className="compact-flow"><FlowLine steps={project.chapter.flow} /><span>Application overview</span></div>}
    <div className="project-transition" aria-hidden="true"><span>{project.name}</span><span className="transition-thread" /><ArrowDownIcon /></div>
  </article>;
}
export default function Projects() {
  const ref = useEditorialReveal();
  return <section id="projects" className="projects-section">
    <header ref={ref} className="work-introduction section-space" data-environment="cream"><div data-reveal><h2>Built. Shipped.<br /><em>Yours to open.</em></h2><p>Five applications.<br />The interfaces and the systems behind them.</p></div><nav aria-label="Project index">{projects.map(project => <Link href={`#${project.slug}`} key={project.slug}><span>{project.chapter.index}</span><strong>{project.name}</strong><span>{project.chapter.label}</span><ArrowUpRightIcon aria-hidden="true" /></Link>)}</nav></header>
    {projects.map(project => <ProjectChapter key={project.slug} project={project} />)}
  </section>;
}
