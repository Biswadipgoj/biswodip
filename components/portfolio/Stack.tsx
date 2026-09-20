'use client';
import { primaryStack, stack, nanoValidationCode, portfolioCopy, projects, stackCopy } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { CodeWindow } from '@/components/cinematic/SoftwarePrimitives';
import TechLogo from '@/components/ui/TechLogo';
import { ArrowUpRightIcon } from '@/components/icons';

export default function Stack() {
  const ref = useEditorialReveal();
  return <section id="stack" ref={ref} className="stack-section section-space" data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '10%', right: '8%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(166, 200, 174, 0.75), transparent 70%)' }} aria-hidden="true" />
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '20%', left: '6%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(224, 213, 168, 0.65), transparent 70%)' }} aria-hidden="true" />
    <header className="section-heading"><h2><AnimatedText>{portfolioCopy.stack}</AnimatedText></h2><p data-reveal>{portfolioCopy.stackBody}</p></header>
    <div className="request-composition">
      <div className="request-source" data-depth="panel" data-spatial="panel">
        <div className="request-method"><span>POST</span><code>/api/links</code><span>201 Created</span></div>
        <CodeWindow lines={nanoValidationCode} file="src/app/api/links/route.ts" label="Source excerpt · NanoLink request validation"/>
        <a href={projects[1].evidence[0].url} target="_blank" rel="noopener noreferrer" className="text-link">Read the route<ArrowUpRightIcon aria-hidden="true"/></a>
      </div>
      <ol className="request-steps" data-flow>
        <span className="request-track" aria-hidden="true"><span data-wire="vertical"/></span>
        {portfolioCopy.request.map((step,i)=><li key={step.name}>
          <span className="request-index" aria-hidden="true">0{i+1}</span>
          <div data-reveal><span className="request-tool">{step.tool}</span><h3><AnimatedText>{step.name}</AnimatedText></h3><p>{step.detail}</p></div>
        </li>)}
      </ol>
    </div>
    <div className="technology-section">
      <h3><AnimatedText>{stackCopy.title}</AnimatedText></h3>
      <div className="primary-stack" data-spatial="stagger-3d" aria-label="Core technologies">{primaryStack.map(tech=><span key={tech}><TechLogo craft={tech} mono size={24}/><span>{tech}</span></span>)}</div>
      <div className="stack-categories" data-spatial="stagger-3d">{stack.map(category=><div className="stack-category" data-spatial="card" key={category.title}><h4>{category.title}</h4><ul>{category.tools.map(tool=><li key={tool}>{tool}</li>)}</ul></div>)}</div>
      <dl className="stack-notes" data-stagger>{stackCopy.notes.map(note=><div key={note.name}><dt>{note.name}</dt><dd>{note.body}</dd></div>)}</dl>
    </div>
    <div className="kinetic-band" aria-hidden="true">
      <span data-drift>Interface · Logic · Data · AI Pipelines · Production Delivery</span>
    </div>
  </section>;
}
