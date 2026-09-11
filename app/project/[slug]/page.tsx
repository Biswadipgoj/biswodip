import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.name.toLowerCase().replace(/ /g, '-') }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.name.toLowerCase().replace(/ /g, '-') === slug);
  if (!project) return notFound();
  return <main className="section-shell project-detail"><Link href="/#projects" className="text-link"><Icon name="arrowDown" className="rotate-90" /> Back to selected work</Link><div className="detail-heading"><p className="eyebrow">Project notes / Independent build</p><h1>{project.name}</h1><p className="body-lg">{project.blurb}</p></div><div className="detail-grid"><div><p className="body-lg">{project.description}</p><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><h2>Inside the build</h2><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="actions"><a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Visit live site <Icon name="arrowUpRight" /></a>{project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link">View source code <Icon name="arrowUpRight" /></a>}</div></div><div className="browser-preview"><div className="browser-bar"><span aria-hidden="true">•••</span><span>{new URL(project.url).hostname}</span></div><div className="preview-image">{project.previewImage && <Image src={project.previewImage} alt={`${project.name} interface`} fill priority sizes="(max-width: 899px) 90vw, 50vw" className="object-cover object-top" />}</div></div></div><nav className="detail-navigation" aria-label="Other projects">{projects.filter(item => item !== project).map(item => <Link key={item.name} href={`/project/${item.name.toLowerCase()}`}>{item.name}<Icon name="arrowUpRight" /></Link>)}</nav></main>;
}
