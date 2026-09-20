'use client';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { projects, storyCopy, portfolioCopy, type Project } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { ProjectActions, ProjectMedia, FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowUpRightIcon } from '@/components/icons';
import NanoLinkScene from './NanoLinkScene';
import TelePointScene from './TelePointScene';

export function projectStyle(project: Project): CSSProperties {
  return { '--chapter-bg': project.chapter.bg, '--chapter-ink': project.chapter.ink, '--chapter-accent': project.chapter.accent } as CSSProperties;
}

function ProjectChapter({project,index}: {project: Project;index: number}) {
  const ref = useEditorialReveal();
  const layout = index === 0 || index === 4 ? 'expanse' : index === 2 ? 'panorama' : 'split';
  return <article ref={ref} id={project.slug} className={'project-chapter project-'+project.slug+' layout-'+layout} style={projectStyle(project)} data-motion-root>
    <div className="chapter-meta" data-reveal><span>{project.chapter.index} / {project.chapter.label}</span><span>Independent project</span></div>
    <div className="project-card">
      <header className="project-heading">
        <h3><Link href={'/project/'+project.slug}><AnimatedText>{project.name}</AnimatedText><ArrowUpRightIcon aria-hidden="true"/><span className="sr-only"> project details</span></Link></h3>
        <p data-reveal>{project.blurb}</p>
        <ul className="project-stack" data-stagger aria-label={project.name+' stack'}>{project.techStack.map(tech=><li key={tech}>{tech}</li>)}</ul>
        <ProjectActions project={project} notes/>
      </header>
      <Link className="project-visual" href={'/project/'+project.slug}>
        <div data-media><ProjectMedia project={project}/></div>
        <span className="screenshot-caption"><span>{project.slug==='telepoint'?'Live EMI portal interface':'Real application interface'}</span><span>Explore project<ArrowUpRightIcon aria-hidden="true"/></span></span>
      </Link>
    </div>
    <div className="project-insight">
      <div><h4 data-reveal>{storyCopy.focus}</h4><ul className="project-features" data-stagger>{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul></div>
      <p data-reveal>{project.technicalNote}</p>
    </div>
    {project.slug==='nanolink' ? <NanoLinkScene project={project}/> : project.slug==='telepoint' ? <TelePointScene project={project}/> : <FlowLine steps={project.chapter.flow}/>}
  </article>;
}

export default function Projects() {
  const ref = useEditorialReveal();
  return <section id="projects" ref={ref} className="projects-section" data-motion-root>
    <header className="projects-intro section-space">
      <p className="section-index">03 / Selected work</p>
      <h2><AnimatedText>{portfolioCopy.work}</AnimatedText><span className="project-total">(05)</span></h2>
      <p data-reveal>{storyCopy.projectsIntro}</p>
      <nav aria-label="Featured projects" data-stagger>{projects.map(p=><a href={'#'+p.slug} key={p.slug}><span>{p.chapter.index}</span>{p.name}<ArrowUpRightIcon aria-hidden="true"/></a>)}</nav>
    </header>
    {projects.map((project,i)=><ProjectChapter project={project} index={i} key={project.slug}/>)}
  </section>;
}
