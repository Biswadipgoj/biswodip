import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, personal, nanoCode, nanoFields } from '@/lib/data';
import { CodeWindow, FlowLine, ProjectActions, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons';
export function generateStaticParams(){return projects.map(project=>({slug:project.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const project=projects.find(item=>item.slug===slug);
  if(!project) return {title:'Project not found'};
  return {title:project.name+' | '+personal.name,description:project.description,alternates:{canonical:'/project/'+project.slug},openGraph:{title:project.name+' | '+personal.name,description:project.blurb,images:[{url:project.previewImage,width:1440,height:900}]}};
}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const project=projects.find(item=>item.slug===slug);if(!project) notFound();
  const theme={'--chapter-bg':project.chapter.bg,'--chapter-ink':project.chapter.ink,'--chapter-accent':project.chapter.accent} as CSSProperties;
  return <div className="project-detail" style={theme}>
    <a className="skip-link" href="#project-content">Skip to content</a>
    <header className="detail-nav"><Link className="wordmark" href="/">biswodip<span>.</span></Link><Link className="text-link" href="/#projects">All projects<ArrowRightIcon aria-hidden="true"/></Link></header>
    <main id="project-content">
      <header className="detail-heading"><h1>{project.name}</h1><p>{project.blurb}</p><ProjectActions project={project} detail/></header>
      <section className="detail-section overview"><h2>Overview</h2><div><p className="detail-description">{project.description}</p><h3>What I built</h3><p>{project.technicalNote}</p></div></section>
      <section className="detail-product"><h2>Product</h2><ProjectMedia project={project} priority/></section>
      <section className="detail-section"><h2>Engineering</h2><div className="decision-list">{project.decisions.map(decision=><article key={decision.title}><h3>{decision.title}</h3><dl><div><dt>What</dt><dd>{decision.what}</dd></div><div><dt>Why</dt><dd>{decision.why}</dd></div><div><dt>How</dt><dd>{decision.how}</dd></div></dl></article>)}</div></section>
      <section className="detail-section"><h2>Data</h2><div><p>{project.data}</p>{slug==='nanolink'&&<dl className="detail-schema">{nanoFields.map(([name,type])=><div key={name}><dt>{name}</dt><dd>{type}</dd></div>)}</dl>}</div></section>
      <section className="detail-section"><h2>API</h2><div><p>{project.api}</p><FlowLine steps={project.chapter.flow}/><p className="flow-note">Application workflow</p></div></section>
      {slug==='nanolink'&&<section className="detail-source"><h2>Representative implementation</h2><p>The create-link route saves the validated destination and selected options. This is a contiguous excerpt from the project source. The database client is an implementation detail.</p><CodeWindow lines={nanoCode} file="src/app/api/links/route.ts" label="Representative implementation"/><a className="text-link" href={project.evidence[0].url} target="_blank" rel="noopener noreferrer">Read the complete API route<ArrowUpRightIcon aria-hidden="true"/></a></section>}
      <section className="detail-section"><h2>Interface</h2><div><p>{project.interface}</p><ul className="interface-details">{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul></div></section>
      <section className="detail-section"><h2>Technology</h2><div><ul className="detail-stack">{project.techStack.map(tech=><li key={tech}>{tech}</li>)}</ul><p className="engineering-details">{project.engineering.join(' · ')}</p></div></section>
      <section className="detail-evidence"><div><h2>Source</h2><a className="text-link" href={project.repo} target="_blank" rel="noopener noreferrer">Open GitHub repository<ArrowUpRightIcon aria-hidden="true"/></a><div className="source-references">{project.evidence.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRightIcon aria-hidden="true"/></a>)}</div></div><div><h2>Run</h2><a className="action" href={project.url} target="_blank" rel="noopener noreferrer">Run {project.name}<ArrowUpRightIcon aria-hidden="true"/></a></div></section>
      <nav className="other-projects" aria-label="Other projects">{projects.filter(item=>item.slug!==slug).map(item=><Link href={'/project/'+item.slug} key={item.slug}>{item.name}<ArrowUpRightIcon aria-hidden="true"/></Link>)}</nav>
    </main><footer className="detail-footer"><span>{personal.name} · {personal.role}</span><a href={'mailto:'+personal.email}>{personal.email}</a></footer>
  </div>;
}

