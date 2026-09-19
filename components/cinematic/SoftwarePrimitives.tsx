import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, ArrowRightIcon } from '@/components/icons';
import { hero, type Project } from '@/lib/data';

export function ActionLink({href,children,quiet=false,external=false,className=''}:{href:string;children:React.ReactNode;quiet?:boolean;external?:boolean;className?:string}) {
  return <Button asChild variant={quiet?'ghost':'default'} className={'action '+(quiet?'action-quiet ':'')+className}>{external?<a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRightIcon aria-hidden="true"/></a>:<Link href={href}>{children}<ArrowRightIcon aria-hidden="true"/></Link>}</Button>;
}
export function ProjectActions({project,notes=false,detail=false}:{project:Project;notes?:boolean;detail?:boolean}) {
  return <div className="project-actions"><ActionLink href={project.url} external>{detail?'Run':'Live'}<span className="sr-only"> {project.name}</span></ActionLink><ActionLink href={project.repo} quiet external>Source<span className="sr-only"> for {project.name}</span></ActionLink>{notes&&<Link className="text-link" href={'/project/'+project.slug}>Project details</Link>}</div>;
}
export function ProjectMedia({project,className='',priority=false}:{project:Project;className?:string;priority?:boolean}) {
  return <figure className={'product-image glass-panel '+className} data-tilt-3d><div className="product-image-top"><span>{project.name}</span><span>{new URL(project.url).hostname}</span><ArrowUpRightIcon aria-hidden="true"/></div><div className="product-image-content"><Image src={project.previewImage} alt={project.imageAlt} fill sizes="(max-width: 799px) 92vw, (max-width: 1200px) 62vw, 900px" priority={priority}/></div></figure>;
}
export function CodeWindow({lines,file,label,className=''}:{lines:readonly string[];file:string;label:string;className?:string}) {
  return <figure className={'code-window glass-panel '+className} data-tilt-3d data-scroll-3d><div className="code-toolbar"><span>{file}</span><span>TypeScript</span></div><pre tabIndex={0} aria-label={label}><code>{lines.map((line,i)=><span className="code-row" key={i}><span className="line-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><span className="code-line">{line}</span>{'\n'}</span>)}</code></pre><figcaption>{label}</figcaption></figure>;
}
export function BuildPipeline({className=''}:{className?:string}) {
  return <FlowLine className={className} steps={hero.workflow}/>;
}
export function FlowLine({steps,className=''}:{steps:readonly string[];className?:string}) {
  return <ol className={'flow-line '+className}>{steps.map((step,i)=><li key={step}><span className="flow-node">{step}</span>{i<steps.length-1&&<span className="flow-connection" aria-hidden="true"><span data-wire/><ArrowRightIcon/></span>}</li>)}</ol>;
}

