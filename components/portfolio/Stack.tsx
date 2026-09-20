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
    <header className="section-heading"><h2><AnimatedText>{portfolioCopy.stack}</AnimatedText></h2><p data-reveal>{portfolioCopy.stackBody}</p></header>
    <div className="request-composition">
      <div className="request-source">
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
      <div className="primary-stack" data-stagger aria-label="Core technologies">{primaryStack.map(tech=><span key={tech}><TechLogo craft={tech} mono size={24}/><span>{tech}</span></span>)}</div>
      <div className="stack-categories" data-stagger>{stack.map(category=><div className="stack-category" key={category.title}><h4>{category.title}</h4><ul>{category.tools.map(tool=><li key={tool}>{tool}</li>)}</ul></div>)}</div>
      <dl className="stack-notes" data-stagger>{stackCopy.notes.map(note=><div key={note.name}><dt>{note.name}</dt><dd>{note.body}</dd></div>)}</dl>
    </div>
    <div className="kinetic-band" aria-hidden="true"><span data-drift>Interface. Logic. Data. Connected.</span></div>
  </section>;
}
