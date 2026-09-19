'use client';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { projects, storyCopy, type Project } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { ProjectActions, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowUpRightIcon } from '@/components/icons';
import NanoLinkScene from './NanoLinkScene';
import TelePointScene from './TelePointScene';

export function projectStyle(project: Project): CSSProperties {
  return { '--chapter-bg': project.chapter.bg, '--chapter-ink': project.chapter.ink, '--chapter-accent': project.chapter.accent } as CSSProperties;
}

function ProjectChapter({project, index}: {project: Project; index: number}) {
  const ref = useEditorialReveal();
  const isEven = index % 2 === 0;
  return <article ref={ref} id={project.slug} className={'project-chapter project-'+project.slug} style={projectStyle(project)} data-fade-section>
    <div className="project-card" data-scroll-3d>
      <header className="project-heading" data-reveal={isEven ? 'left' : 'right'}>
        <h3><Link href={'/project/'+project.slug}>{project.name}<ArrowUpRightIcon aria-hidden="true"/><span className="sr-only"> project details</span></Link></h3>
        <p data-reveal>{project.blurb}</p>
        <ul className="project-stack" data-stagger aria-label={project.name+' stack'}>
          {project.techStack.map(tech=><li key={tech} className="glass-pill" style={{padding: '4px 12px', borderRadius: '16px'}}>{tech}</li>)}
        </ul>
        <div className="project-focus glass-panel" data-reveal="3d-depth" style={{padding: '20px', borderRadius: '12px', margin: '20px 0'}}>
          <h4>{storyCopy.focus}</h4>
          <ul data-stagger>{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul>
        </div>
        <ProjectActions project={project}/>
      </header>
      <Link className="project-visual" href={'/project/'+project.slug} aria-label={'Explore '+project.name+' project details'} data-tilt-3d data-scroll-3d>
        <div data-media><ProjectMedia project={project}/></div>
        <span className="screenshot-caption" data-reveal="blur">
          {project.slug==='telepoint'?'Live EMI portal interface':'Real application interface'}
          <span style={{display: 'inline-flex', alignItems: 'center', gap: '6px'}}>Explore project<ArrowUpRightIcon aria-hidden="true"/></span>
        </span>
      </Link>
    </div>
    {project.slug==='nanolink' && <NanoLinkScene project={project}/>}
    {project.slug==='telepoint' && <TelePointScene project={project}/>}
  </article>;
}

export default function Projects() {
  const ref = useEditorialReveal();
  return <section id="projects" ref={ref} className="projects-section">
    <header className="projects-intro section-space">
      <div>
        <h2 data-split>{storyCopy.projectsTitle}</h2>
        <p data-reveal>{storyCopy.projectsIntro}</p>
      </div>
      <nav aria-label="Featured projects" data-stagger>
        {projects.map(p=><span key={p.slug} data-magnetic>
          <a href={'#'+p.slug}>{p.name}<ArrowUpRightIcon aria-hidden="true"/></a>
        </span>)}
      </nav>
    </header>
    {projects.map((project, i)=><ProjectChapter project={project} index={i} key={project.slug}/>)}
  </section>;
}
