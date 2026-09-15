import { projects, personal } from '@/lib/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

const slugify = (name: string) => name.toLowerCase().replace(/ /g, '-');

export function generateStaticParams() {
  return projects.map(project => ({ slug: slugify(project.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => slugify(item.name) === slug);
  if (!project) return { title: 'Project not found' };
  return { title: `${project.name} | ${personal.name}`, description: project.blurb };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => slugify(item.name) === slug);
  if (!project) return notFound();
  const stack = project.techStack?.length ? project.techStack : project.tags;
  return (
    <>
    <a href="#main" className="skip-link">Skip to project</a>
    <header className="site-header">
      <div className="header-inner !h-auto min-h-[72px] flex-wrap !gap-x-5 !gap-y-1 py-3">
        <Link href="/" className="wordmark min-h-11" aria-label={`${personal.name}, home`}><span className="brand-mark" aria-hidden="true">b.</span>{personal.firstName}</Link>
        <nav aria-label="Project page navigation" className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <Link href="/#projects" className="inline-flex min-h-11 items-center hover:underline">Selected work</Link>
          <Link href="/#contact" className="inline-flex min-h-11 items-center hover:underline">Contact</Link>
        </nav>
      </div>
    </header>
    <main id="main" tabIndex={-1} className="section-shell project-detail">
      <Link href="/#projects" className="text-link">
        <Icon name="arrowDown" className="rotate-90" /> Back to selected work
      </Link>
      <div className="detail-heading">
        <h1 className="!tracking-[-0.04em]">{project.name}</h1>
        <p className="body-lg">{project.blurb}</p>
        <div className="actions">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label={`Visit ${project.name} live site (opens in a new tab)`}>
            Visit live site <Icon name="arrowUpRight" />
          </a>
          {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`View ${project.name} source code (opens in a new tab)`}>
            View source code <Icon name="arrowUpRight" />
          </a>}
        </div>
      </div>
      <div className="detail-grid">
        <div>
          <p className="body-lg">{project.description}</p>
          <h2>Tools used</h2>
          <ul aria-label="Project technologies" className="mt-5 flex list-none flex-wrap gap-2 p-0">{stack.map(item => <li key={item} className="rounded-md border border-[var(--edge-2)] px-3 py-2 text-sm">{item}</li>)}</ul>
          <h2>Inside the build</h2>
          <ul className="feature-list">{project.features.map(feature => <li key={feature} className="!text-sm">{feature}</li>)}</ul>
        </div>
        <figure className="m-0 min-w-0">
          <div className="browser-preview">
          <div className="browser-bar !leading-relaxed">
            <span className="min-w-0 [overflow-wrap:anywhere]">{new URL(project.url).hostname}</span>
            <span className="shrink-0">Screenshot</span>
          </div>
          <div className="preview-image !aspect-[3/2]">
            {project.previewImage && (
              <Image
                src={project.previewImage}
                alt={`${project.name} interface`}
                fill
                priority
                sizes="(max-width: 980px) 90vw, 500px"
                className="object-contain !transform-none"
              />
            )}
          </div>
          </div>
          <figcaption className="mt-3 text-sm text-[var(--ink-2)]">Preview of {project.name}. The live site may have changed since this screenshot.</figcaption>
        </figure>
      </div>
      <nav className="detail-navigation" aria-label="Other projects">
        {projects.filter(item => item !== project).map(item => (
          <Link key={item.name} href={`/project/${slugify(item.name)}`} className="min-h-11">
            {item.name}<Icon name="arrowUpRight" />
          </Link>
        ))}
      </nav>
    </main>
    </>
  );
}
