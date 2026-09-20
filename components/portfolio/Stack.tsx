'use client';
import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { stack, nanoValidationCode, portfolioCopy, projects, skillExperience } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { CodeWindow } from '@/components/cinematic/SoftwarePrimitives';
import TechLogo from '@/components/ui/TechLogo';
import { ArrowUpRightIcon } from '@/components/icons';

export default function Stack() {
  const ref = useEditorialReveal();
  const [selected, setSelected] = useState<string | null>(null);
  const technologies = [...new Set(projects.flatMap(project => project.techStack))];
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [selected]);
  const matching = projects.filter(project => !selected || project.techStack.includes(selected));
  return <section id="stack" ref={ref} className="stack-section section-space" data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '10%', right: '8%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(166, 200, 174, 0.75), transparent 70%)' }} aria-hidden="true" />
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '20%', left: '6%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(224, 213, 168, 0.65), transparent 70%)' }} aria-hidden="true" />
    <header className="section-heading"><h2><AnimatedText>{portfolioCopy.stack}</AnimatedText></h2><p data-reveal>{portfolioCopy.stackBody}</p></header>
    <div className="technology-section skill-explorer">
      <div className="skill-explorer-heading"><h3>{skillExperience.title}</h3><p>{skillExperience.hint}</p></div>
      <div className="skill-filters" role="group" aria-label={skillExperience.title}>
        <button type="button" aria-pressed={!selected} onClick={() => setSelected(null)}>{skillExperience.all}</button>
        {technologies.map(tech => <button type="button" key={tech} aria-pressed={selected === tech} onClick={() => setSelected(selected === tech ? null : tech)}><span aria-hidden="true"><TechLogo craft={tech} mono size={22}/></span>{tech}</button>)}
      </div>
      <div className="skill-proof-heading"><h4>{skillExperience.projectsLabel}</h4><span role="status" aria-live="polite">{selected || skillExperience.all} / {matching.length} / {projects.length}</span></div>
      <div className="skill-proof-list">
        {matching.map(project => <Link key={project.slug} href={'/project/'+project.slug} className="skill-proof-row"><span className="skill-project-name">{project.name}<ArrowUpRightIcon aria-hidden="true"/></span><span>{project.blurb}</span><span className="skill-proof-tech">{project.techStack.join(' / ')}</span></Link>)}
      </div>
      <div className="stack-categories" data-spatial="stagger-3d">{[skillExperience.analysis, ...stack].map(category=><details className="stack-category" key={category.title} onToggle={() => ScrollTrigger.refresh()}><summary>{category.title}<span aria-hidden="true">+</span></summary><ul>{category.tools.map(tool=><li key={tool}>{tool}</li>)}</ul></details>)}</div>
    </div>
    <header className="request-heading"><h3><AnimatedText>{skillExperience.requestTitle}</AnimatedText></h3><p>{skillExperience.requestBody}</p></header>
    <div className="request-composition">
      <div className="request-source" data-depth="panel" data-spatial="panel">
        <div className="request-method"><span>POST</span><code>/api/links</code><span>201 Created</span></div>
        <CodeWindow lines={nanoValidationCode} file="src/app/api/links/route.ts" label="Source excerpt · NanoLink request validation"/>
        <a href={projects[1].evidence[0].url} target="_blank" rel="noopener noreferrer" className="text-link">Read the route<ArrowUpRightIcon aria-hidden="true"/></a>
      </div>
      <ol className="request-steps" data-flow>
        {portfolioCopy.request.map((step,i)=><li key={step.name}>
          <span className="request-index" aria-hidden="true">0{i+1}</span>
          <div data-reveal><span className="request-tool">{step.tool}</span><h3><AnimatedText>{step.name}</AnimatedText></h3><p>{step.detail}</p></div>
        </li>)}
      </ol>
    </div>
    <div className="kinetic-band" aria-hidden="true">
      <span data-drift>{skillExperience.workflow}</span>
    </div>
  </section>;
}
