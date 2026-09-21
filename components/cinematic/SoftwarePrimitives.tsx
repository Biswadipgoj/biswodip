import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, ArrowRightIcon } from '@/components/icons';
import { hero, type Project } from '@/lib/data';
import TechLogo from '@/components/ui/TechLogo';
import { codeMarkup } from '@/lib/motion-markup';


export function ActionLink({href,children,quiet=false,external=false,className=''}:{href:string;children:React.ReactNode;quiet?:boolean;external?:boolean;className?:string}) {
  return <Button asChild variant={quiet?'ghost':'default'} className={'action '+(quiet?'action-quiet ':'')+className}>{external?<a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRightIcon aria-hidden="true"/></a>:<Link href={href}>{children}<ArrowRightIcon aria-hidden="true"/></Link>}</Button>;
}
/**
 * Project actions borrow two conventions recruiters already know: a deployment-status pill
 * (a live dot and the real domain, as hosting dashboards show it) and a repository button
 * with the GitHub mark.
 */
export function ProjectActions({project,notes=false,detail=false}:{project:Project;notes?:boolean;detail?:boolean}) {
  const host = new URL(project.url).hostname;
  return <div className="project-actions">
    <a className="btn-live" href={project.url} target="_blank" rel="noopener noreferrer">
      <span className="btn-live-dot" aria-hidden="true"/>{detail?'Run':'Live'}<span className="btn-live-host">{host}</span><span className="sr-only"> {project.name}</span><ArrowUpRightIcon aria-hidden="true"/>
    </a>
    <a className="btn-code" href={project.repo} target="_blank" rel="noopener noreferrer">
      <span aria-hidden="true"><TechLogo slug="github" size={16} mono/></span>Source<span className="sr-only"> for {project.name}</span>
    </a>
    {notes&&<Link className="text-link" href={'/project/'+project.slug}>Project details</Link>}
  </div>;
}
export function ProjectMedia({project,className='',priority=false}:{project:Project;className?:string;priority?:boolean}) {
  const host = new URL(project.url).hostname;
  return (
    <figure className={'product-image '+className} data-depth={priority?undefined:'screen'}>
      <div className="product-image-top">
        <div className="window-controls" aria-hidden="true">
          <span className="window-dot window-dot-close" />
          <span className="window-dot window-dot-min" />
          <span className="window-dot window-dot-max" />
        </div>
        <div className="window-address-pill">
          <span className="window-lock-icon" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </span>
          <span className="window-hostname">{host}</span>
        </div>
        <div className="window-live-badge">
          <span className="window-pulse-dot" aria-hidden="true" />
          <span className="window-live-text">Live</span>
          <ArrowUpRightIcon aria-hidden="true" className="window-launch-icon"/>
        </div>
      </div>
      <div className="product-image-content">
        <Image src={project.previewImage} alt={project.imageAlt} fill sizes="(max-width: 799px) 92vw, (max-width: 1200px) 62vw, 900px" priority={priority} fetchPriority={priority?'high':undefined}/>
        <div className="product-glass-sheen" aria-hidden="true" />
      </div>
    </figure>
  );
}
export function CodeWindow({lines,file,label,className=''}:{lines:readonly string[];file:string;label:string;className?:string}) {
  return <figure className={'code-window '+className} data-depth="panel"><div className="code-toolbar"><span>{file}</span><span>TypeScript</span></div><pre tabIndex={0} aria-label={label} data-type="code" style={{ containIntrinsicBlockSize: `auto ${lines.length * 1.9}em` }}><code><span className="sr-only">{lines.join('\n')}</span><span aria-hidden="true" data-motion-visual dangerouslySetInnerHTML={{ __html: codeMarkup(lines) }}/></code></pre><figcaption>{label}</figcaption></figure>;
}
export function FlowLine({steps,className=''}:{steps:readonly string[];className?:string}) {
  return <ol className={'flow-line '+className} data-flow data-stagger>{steps.map((step,i)=><li key={step}><span className="flow-node">{step}</span>{i<steps.length-1&&<span className="flow-connection" aria-hidden="true"><span data-wire/><ArrowRightIcon/></span>}</li>)}</ol>;
}

