import { projects, personal } from '@/lib/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const slugify = (name: string) => name.toLowerCase().replace(/ /g, '-');

export function generateStaticParams() {
  return projects.map((project) => ({ slug: slugify(project.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => slugify(item.name) === slug);
  if (!project) return { title: 'Project not found' };
  return { title: `${project.name} | ${personal.name}`, description: project.blurb };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => slugify(item.name) === slug);
  if (!project) return notFound();

  return (
    <div style={{ backgroundColor: 'var(--c-cream)', minHeight: '100vh', color: 'var(--ink-primary)' }}>
      <a href="#main" className="skip-link">
        Skip to project
      </a>
      <header
        style={{
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 253, 249, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-tint)',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--ink-primary)',
            textDecoration: 'none',
          }}
        >
          {personal.name}
        </Link>
        <nav style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
          <Link href="/#work" style={{ color: 'var(--ink-secondary)', textDecoration: 'none', fontWeight: 500 }}>
            Work
          </Link>
          <Link href="/#about" style={{ color: 'var(--ink-secondary)', textDecoration: 'none', fontWeight: 500 }}>
            About
          </Link>
          <Link href="/#contact" style={{ color: 'var(--ink-secondary)', textDecoration: 'none', fontWeight: 500 }}>
            Contact
          </Link>
        </nav>
      </header>

      <main
        id="main"
        tabIndex={-1}
        style={{
          maxWidth: '1020px',
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        <Link
          href="/#work"
          style={{
            fontSize: '0.88rem',
            color: 'var(--ink-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '32px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          ← Back to work
        </Link>

        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '999px',
              backgroundColor: 'var(--c-apricot)',
              color: 'var(--ink-plum)',
              marginBottom: '12px',
            }}
          >
            PROJECT SPECIFICATION
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
              color: 'var(--ink-primary)',
            }}
          >
            {project.name}
          </h1>
          <p
            style={{
              color: 'var(--ink-secondary)',
              fontSize: '1.15rem',
              maxWidth: '60ch',
              lineHeight: 1.6,
            }}
          >
            {project.blurb}
          </p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
            >
              Run {project.name} <span aria-hidden="true">↗</span>
            </a>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-action"
              >
                View source <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              padding: '32px',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--border-tint)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--ink-primary)' }}>
              Overview &amp; Purpose
            </h2>
            <p style={{ lineHeight: 1.75, marginBottom: '28px', color: 'var(--ink-secondary)' }}>
              {project.description}
            </p>

            <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--ink-primary)' }}>
              Architecture &amp; Data Model
            </h2>
            <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
              {project.technicalNote}
            </p>

            <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--ink-primary)' }}>
              Verified Tech Stack
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-tag-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.previewImage && (
            <figure
              style={{
                margin: 0,
                position: 'relative',
                aspectRatio: '16/10',
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-tint)',
                boxShadow: 'var(--shadow-medium)',
                background: '#FFFFFF',
              }}
            >
              <Image
                src={project.previewImage}
                alt={`${project.name} interface`}
                fill
                priority
                sizes="(max-width: 980px) 95vw, 1000px"
                style={{ objectFit: 'cover' }}
              />
            </figure>
          )}
        </div>

        <nav
          style={{
            marginTop: '60px',
            paddingTop: '28px',
            borderTop: '1px solid var(--border-tint)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '14px',
          }}
          aria-label="Other projects"
        >
          <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
            EXPLORE OTHER SYSTEMS:
          </span>
          {projects
            .filter((item) => item !== project)
            .map((item) => (
              <Link
                key={item.name}
                href={`/project/${slugify(item.name)}`}
                className="tech-tag-pill"
                style={{ textDecoration: 'none' }}
              >
                {item.name} <span aria-hidden="true">→</span>
              </Link>
            ))}
        </nav>
      </main>
    </div>
  );
}
