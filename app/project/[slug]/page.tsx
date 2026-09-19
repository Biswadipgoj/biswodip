import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, personal, nanoCode, nanoFields } from '@/lib/data';
import { CodeWindow, FlowLine, ProjectActions, ProjectMedia } from '@/components/cinematic/SoftwarePrimitives';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons';

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return { title: 'Project not found' };
  return { title: `${project.name} | ${personal.name}`, description: project.description,
    alternates: { canonical: `/project/${project.slug}` },
    openGraph: { title: `${project.name} | ${personal.name}`, description: project.blurb, images: [{ url: project.previewImage, width: 1440, height: 900 }] },
  };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const theme = { '--chapter-bg': project.chapter.bg, '--chapter-ink': project.chapter.ink, '--chapter-accent': project.chapter.accent } as CSSProperties;
  return <div className="project-detail" style={theme}>
    <a className="skip-link" href="#project-content">Skip to content</a>
    <header className="detail-nav"><Link className="wordmark" href="/">biswodip<span>.</span></Link><Link className="text-link" href="/#projects">All projects<ArrowRightIcon aria-hidden="true" /></Link></header>
    <main id="project-content">
      <header className="detail-heading"><h1>{project.name}<em>/{project.chapter.index}</em></h1><div><p>{project.blurb}</p><span>{project.chapter.label}</span></div><ProjectActions project={project} notes={false} /></header>
      <ProjectMedia project={project} priority />
      <div className="detail-overview"><h2>The product.</h2><div><p className="detail-description">{project.description}</p><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div></div>
      <section className="detail-engineering"><div><h2>How it fits<br /><em>together.</em></h2><p>{project.technicalNote}</p></div><div className="detail-stack"><span>Project stack</span>{project.techStack.map(tech => <strong key={tech}>{tech}</strong>)}</div></section>
      <div className="detail-flow"><FlowLine steps={project.chapter.flow} /><p>Conceptual application overview</p></div>
      {project.slug === 'nanolink' && <section className="detail-source"><h2>A link, made persistent.</h2><CodeWindow lines={nanoCode} file="api/links/route.ts" label="Actual source excerpt · NanoLink" /><div className="detail-schema"><h3>Link model</h3><p>Selected fields from the real Prisma schema.</p><dl>{nanoFields.map(([name, type]) => <div key={name}><dt>{name}</dt><dd>{type}</dd></div>)}</dl></div></section>}
      <section className="detail-evidence"><h2>Open the work.</h2><ProjectActions project={project} notes={false} /><div className="source-references">{project.evidence.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRightIcon aria-hidden="true" /></a>)}</div></section>
      <nav className="other-projects" aria-label="Other projects">{projects.filter(item => item.slug !== slug).map(item => <Link href={`/project/${item.slug}`} key={item.slug}><span>{item.name}</span><ArrowUpRightIcon aria-hidden="true" /></Link>)}</nav>
    </main>
    <footer className="detail-footer"><span>{personal.name}</span><a href={`mailto:${personal.email}`}>{personal.email}</a></footer>
  </div>;
}
