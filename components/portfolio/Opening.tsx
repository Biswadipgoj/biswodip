'use client';
import Image from 'next/image';
import { hero, personal, socials, stackCopy } from '@/lib/data';
import { ActionLink } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import { useEditorialReveal } from '@/components/cinematic/useScene';

export default function Opening() {
  const ref = useEditorialReveal();
  return <section id="opening" ref={ref} className="opening" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="hero-eyebrow" data-reveal="blur">{hero.eyebrow}</p>
      <p className="hero-name" data-reveal="left">{personal.name}</p>
      <h1 id="hero-title" data-split>I build software from the <em>interface</em> to the <em>database.</em></h1>
      <p className="hero-body" data-reveal>{hero.body}</p>
      <div className="hero-actions" data-stagger>
        <span data-magnetic><ActionLink href="#projects">{hero.primary}</ActionLink></span>
        <span data-magnetic><ActionLink href="#contact" quiet>{hero.secondary}</ActionLink></span>
        <span data-magnetic><a className="text-link" href={socials[1].url} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRightIcon aria-hidden="true" /></a></span>
      </div>
      <p className="hero-python" data-reveal="blur"><strong>Python</strong> — {stackCopy.notes[2].body.toLowerCase()}</p>
    </div>
    <div className="hero-workflow glass-panel" data-reveal="3d-flip" data-tilt-3d data-scroll-3d data-workflow>
      <div className="workflow-heading" data-reveal="blur">
        <span>Idea → application</span>
        <span aria-hidden="true">[0<span data-count="6">6</span>]</span>
      </div>
      <h2 data-reveal>{hero.workflowTitle}</h2>
      <ol className="workflow-steps" data-stagger>{hero.workflow.map((step,i) => <li key={step}>
        <span className="workflow-number" data-pulse>{String(i+1).padStart(2,'0')}</span>
        <span>{step}</span>
        {i < hero.workflow.length-1 && <span className="workflow-wire" aria-hidden="true"><span data-wire /></span>}
      </li>)}</ol>
      <div className="workflow-person" data-reveal="left">
        <Image src="/biswodip.png" alt="Biswodip Goj" width={54} height={64} priority />
        <div>
          <strong>{personal.name}</strong>
          <span>Builds and ships software products.</span>
        </div>
      </div>
    </div>
    <div className="hero-bottom" data-reveal="3d-depth">
      <span>Frontend · Backend · APIs · Data · Deployment</span>
      <span data-magnetic><a href="#projects">Five real projects<ArrowDownIcon aria-hidden="true" /></a></span>
    </div>
  </section>;
}
