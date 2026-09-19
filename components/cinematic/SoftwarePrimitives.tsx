import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, ArrowRightIcon, CheckIcon } from '@/components/icons';
import type { Project } from '@/lib/data';

export function ActionLink({ href, children, quiet = false, external = false, className = '' }: {
  href: string; children: React.ReactNode; quiet?: boolean; external?: boolean; className?: string;
}) {
  return <Button asChild variant={quiet ? 'ghost' : 'default'} className={`action ${quiet ? 'action-quiet' : ''} ${className}`}>
    {external ? <a href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRightIcon aria-hidden="true" /></a>
      : <Link href={href}>{children}<ArrowRightIcon aria-hidden="true" /></Link>}
  </Button>;
}

export function ProjectActions({ project, notes = true }: { project: Project; notes?: boolean }) {
  return <div className="project-actions">
    <ActionLink href={project.url} external>Run {project.name}</ActionLink>
    {project.repo && <ActionLink href={project.repo} quiet external>View source<span className="sr-only"> for {project.name}</span></ActionLink>}
    {notes && <Link className="text-link case-link" href={`/project/${project.slug}`}>Project notes<ArrowRightIcon aria-hidden="true" /></Link>}
  </div>;
}

export function ProjectMedia({ project, className = '', priority = false }: { project: Project; className?: string; priority?: boolean }) {
  return <figure className={`product-image ${className}`}>
    <div className="product-image-top"><span>{project.name}</span><span>{new URL(project.url).hostname}</span><ArrowUpRightIcon aria-hidden="true" /></div>
    <div className="product-image-content"><Image src={project.previewImage} alt={`${project.name} actual application interface`} fill sizes="(max-width: 799px) 100vw, 90vw" priority={priority} className="product-shot" /></div>
  </figure>;
}

function SyntaxLine({ line }: { line: string }) {
  const pieces = line.split(/(\b(?:async|function|const|await|return|new|false|null)\b|\b(?:build|understand|architect|implement|check|ship|create|prisma|NextResponse)\b)/g);
  return <>{pieces.map((piece, i) => <span key={i} className={/^(async|function|const|await|return|new|false|null)$/.test(piece) ? 'syntax-keyword' : /^(build|understand|architect|implement|check|ship|create|prisma|NextResponse)$/.test(piece) ? 'syntax-function' : undefined}>{piece}</span>)}</>;
}

export function CodeWindow({ lines, file, label, className = '' }: { lines: readonly string[]; file: string; label: string; className?: string }) {
  return <div className={`code-window ${className}`}>
    <div className="code-toolbar"><span className="code-tab">{file}</span><span>TypeScript</span></div>
    <div className="code-content"><pre><code>{lines.map((line, i) => <span className="code-row" key={i}><span className="line-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span className="code-line"><SyntaxLine line={line} /><span className="code-cursor" aria-hidden="true" /></span>{'\n'}</span>)}</code></pre></div>
    <div className="code-caption">{label}</div>
  </div>;
}

export function BuildPipeline({ className = '' }: { className?: string }) {
  return <div className={`build-pipeline ${className}`} aria-label="Illustrative build pipeline">
    {['Edit', 'Check', 'Compile', 'Build', 'Ready'].map((step, i) => <div className="build-step" key={step}>
      <span className="build-step-number">{String(i + 1).padStart(2, '0')}</span><strong>{step}</strong><CheckIcon aria-hidden="true" />
    </div>)}
  </div>;
}

export function FlowLine({ steps, className = '' }: { steps: readonly string[]; className?: string }) {
  return <ol className={`flow-line ${className}`}>{steps.map((step, i) => <li key={step}><span className="flow-node">{step}</span>{i < steps.length - 1 && <span className="flow-connection" aria-hidden="true"><span className="flow-pulse" /><ArrowRightIcon /></span>}</li>)}</ol>;
}
