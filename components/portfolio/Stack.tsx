'use client';
import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { stack, nanoValidationCode, portfolioCopy, projects, skillExperience, primaryTechnologies, techSystemProof } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { CodeWindow } from '@/components/cinematic/SoftwarePrimitives';
import TechLogo from '@/components/ui/TechLogo';
import { ArrowUpRightIcon } from '@/components/icons';

export default function Stack() {
  const ref = useEditorialReveal();
  const [selected, setSelected] = useState<string | null>(null);
  const technologies = primaryTechnologies;
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [selected]);
  const matching = projects.filter(project => !selected || project.techStack.includes(selected));
  const activeProof = selected ? techSystemProof[selected] : null;

  return <section id="stack" ref={ref} className="stack-section section-space" data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '10%', right: '8%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(166, 200, 174, 0.75), transparent 70%)' }} aria-hidden="true" />
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '20%', left: '6%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(224, 213, 168, 0.65), transparent 70%)' }} aria-hidden="true" />
    <header className="section-heading"><h2><AnimatedText>{portfolioCopy.stack}</AnimatedText></h2><p data-reveal>{portfolioCopy.stackBody}</p></header>
    <div className="technology-section skill-explorer">
      <div className="skill-explorer-heading"><h3>{skillExperience.title}</h3><p>{skillExperience.hint}</p></div>
      <div className="skill-filters" role="group" aria-label={skillExperience.title}>
        <button type="button" aria-pressed={!selected} onClick={() => setSelected(null)} data-spatial="chip">{skillExperience.all}</button>
        {technologies.map((tech, i) => <button type="button" key={tech} aria-pressed={selected === tech} onClick={() => setSelected(selected === tech ? null : tech)} data-spatial="chip" data-dir={i % 2 === 0 ? 1 : -1}><span aria-hidden="true"><TechLogo craft={tech} mono size={22}/></span>{tech}</button>)}
      </div>
      <div className="skill-proof-heading"><h4>{skillExperience.projectsLabel}</h4><span role="status" aria-live="polite">{selected || skillExperience.all} / {matching.length > 0 ? `${matching.length} projects` : 'Production Architecture'} / {projects.length} featured</span></div>
      <div className="skill-proof-list">
        {matching.map(project => <Link key={project.slug} href={'/project/'+project.slug} className="skill-proof-row" data-spatial="card"><span className="skill-project-name">{project.name}<ArrowUpRightIcon aria-hidden="true"/></span><span>{project.blurb}</span><span className="skill-proof-tech">{project.techStack.join(' / ')}</span></Link>)}
        {activeProof && (
          <div className="tech-system-card" data-spatial="card">
            <div className="tech-system-header">
              <div className="tech-system-badge">
                <TechLogo craft={selected!} size={26} />
                <div>
                  <h4>{activeProof.title}</h4>
                  <span className="tech-system-cat">{activeProof.category} · 50+ Shipped Systems &amp; Remote Contracts</span>
                </div>
              </div>
              <a href="https://github.com/Biswodipgoj" target="_blank" rel="noopener noreferrer" className="text-link">
                GitHub Systems <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </div>
            <p className="tech-system-body">{activeProof.architecture}</p>
            <div className="tech-system-footer">
              <span className="tech-system-context">{activeProof.context}</span>
            </div>
          </div>
        )}
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
    <div className="kinetic-band" aria-hidden="true" data-velocity-skew="-0.9">
      <span data-drift>{skillExperience.workflow}</span>
    </div>
  </section>;
}
