'use client';
import Icon from './Icon';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/data';
import { useExperience } from '../ExperienceProvider';

/** One device for every project. Remote apps load only while the device is visible. */
export default function ProjectDevice({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { spatial } = useExperience();
  const [near, setNear] = useState(false);
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const active = project.embedAllowed !== false && near && (spatial || requested);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: '100px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setLoaded(false); setSlow(false);
    if (!active) return;
    const timer = window.setTimeout(() => setSlow(true), 12000);
    return () => clearTimeout(timer);
  }, [active]);
  return <div className="project-device" ref={ref}>
    <div className="device-toolbar" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><span>{new URL(project.url).hostname}</span><span>↗</span></div>
    <div className="device-screen">
      {project.previewImage ? <Image src={project.previewImage} alt={`${project.name} website preview`} fill sizes="(max-width: 899px) 90vw, 54vw" className="device-snapshot" /> : <div className="device-placeholder"><span>{project.name}</span><p>{project.blurb}</p></div>}
      {active && <iframe key={project.url} src={project.url} title={`${project.name} live preview`} loading="lazy" onLoad={() => setLoaded(true)} referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin" tabIndex={-1} aria-hidden="true" className={`device-iframe ${loaded ? 'is-loaded' : ''}`} />}
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="device-open" aria-label={`Open ${project.name} live website`}><span>Explore {project.name} <Icon name="arrowUpRight" /></span></a>
    </div>
    <div className="device-footer">
      <span><i /> {loaded && active ? 'Live preview' : 'Product preview'}</span>
      {!spatial && project.embedAllowed !== false ? <button type="button" onClick={() => setRequested(value => !value)}>{requested ? 'Pause preview' : 'Load live preview'} <Icon name="arrowUpRight" /></button> : <a href={project.url} target="_blank" rel="noopener noreferrer">Open website <Icon name="arrowUpRight" /></a>}
    </div>
    {slow && !loaded && <p className="preview-note" role="status">Preview is taking a little longer. You can still open the website.</p>}
  </div>;
}
