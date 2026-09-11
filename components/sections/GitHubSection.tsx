'use client';
import Icon from '../ui/Icon';

import { github, projects, experienceCopy } from '@/lib/data';
import Depth from '../ui/Depth';
import Tilt3D from '../ui/Tilt3D';
import MagneticButton from '../ui/MagneticButton';
export default function GitHubSection() {
  return <section id="github" className="github-section section-shell section-space"><div className="section-index"><span>06 — In the open</span><span>@{github.username}</span></div><Depth distance={22}><Tilt3D maxTilt={3}><div className="github-panel glass-panel"><div className="github-copy"><span className="github-symbol" aria-hidden="true">&lt;/&gt;</span><h2>{experienceCopy.github.title}</h2><p>{github.blurb}</p><MagneticButton href={github.url} target="_blank" rel="noopener noreferrer">{experienceCopy.github.link} <Icon name="arrowUpRight" /></MagneticButton></div><div className="repo-list"><div className="repo-list-heading"><span>Featured repositories</span><span aria-hidden="true">↙</span></div>{projects.filter(project => project.repo).map(project => <a href={project.repo} key={project.name} target="_blank" rel="noopener noreferrer"><Icon name="repository" className="repo-icon" /><span><strong>{project.name}</strong><small>{project.blurb}</small></span><Icon name="arrowUpRight" /></a>)}<a className="all-repos" href={`${github.url}?tab=repositories`} target="_blank" rel="noopener noreferrer">Browse all repositories <Icon name="arrowUpRight" /></a></div></div></Tilt3D></Depth></section>;
}
