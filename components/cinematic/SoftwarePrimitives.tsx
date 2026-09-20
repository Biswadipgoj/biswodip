import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, ArrowRightIcon } from '@/components/icons';
import { hero, type Project } from '@/lib/data';
import { codeMarkup } from '@/lib/motion-markup';

export function ActionLink({href,children,quiet=false,external=false,className=''}:{href:string;children:React.ReactNode;quiet?:boolean;external?:boolean;className?:string}) {
  return <Button asChild variant={quiet?'ghost':'default'} className={'action '+(quiet?'action-quiet ':'')+className}>{external?<a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRightIcon aria-hidden="true"/></a>:<Link href={href}>{children}<ArrowRightIcon aria-hidden="true"/></Link>}</Button>;
}
export function ProjectActions({project,notes=false,detail=false}:{project:Project;notes?:boolean;detail?:boolean}) {
  return <div className="project-actions"><ActionLink href={project.url} external>{detail?'Run':'Live'}<span className="sr-only"> {project.name}</span></ActionLink><ActionLink href={project.repo} quiet external>Source<span className="sr-only"> for {project.name}</span></ActionLink>{notes&&<Link className="text-link" href={'/project/'+project.slug}>Project details</Link>}</div>;
}
export function ProjectMedia({project,className='',priority=false}:{project:Project;className?:string;priority?:boolean}) {
  return <figure className={'product-image '+className} data-depth={priority?undefined:'screen'}><div className="product-image-top"><span>{project.name}</span><span>{new URL(project.url).hostname}</span><ArrowUpRightIcon aria-hidden="true"/></div><div className="product-image-content"><Image src={project.previewImage} alt={project.imageAlt} fill sizes="(max-width: 799px) 92vw, (max-width: 1200px) 62vw, 900px" priority={priority} fetchPriority={priority?'high':undefined}/></div></figure>;
}
export function CodeWindow({lines,file,label,className=''}:{lines:readonly string[];file:string;label:string;className?:string}) {
  return <figure className={'code-window '+className} data-depth="panel"><div className="code-toolbar"><span>{file}</span><span>TypeScript</span></div><pre tabIndex={0} aria-label={label} data-type="code" style={{ containIntrinsicBlockSize: `auto ${lines.length * 1.9}em` }}><code><span className="sr-only">{lines.join('\n')}</span><span aria-hidden="true" data-motion-visual dangerouslySetInnerHTML={{ __html: codeMarkup(lines) }}/></code></pre><figcaption>{label}</figcaption></figure>;
}
export function BuildPipeline({className=''}:{className?:string}) {
  return <FlowLine className={className} steps={hero.workflow}/>;
}
export function FlowLine({steps,className=''}:{steps:readonly string[];className?:string}) {
  return <ol className={'flow-line '+className} data-flow data-stagger>{steps.map((step,i)=><li key={step}><span className="flow-node">{step}</span>{i<steps.length-1&&<span className="flow-connection" aria-hidden="true"><span data-wire/><ArrowRightIcon/></span>}</li>)}</ol>;
}

