'use client';
import Image from 'next/image';
import { personal, engineeringScope, storyCopy } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { ArrowUpRightIcon } from '@/components/icons';

export default function Identity() {
  const ref = useEditorialReveal();
  return <section ref={ref} id="about" className="identity section-space">
    <div className="identity-composition" id="identity">
      <div className="identity-intro" data-reveal="left">
        <h2 data-split>The person<br /><em>behind the work.</em></h2>
        <p data-reveal>{personal.intro}</p>
        <span data-reveal="blur">{personal.role} · B.Tech CSE</span>
      </div>
      <figure className="identity-portrait glass-panel" data-media data-tilt-3d>
        <Image src="/biswodip.png" alt="Portrait of Biswodip Goj, full-stack software engineer" width={1086} height={1448} sizes="(max-width: 799px) 85vw, 34vw" />
        <figcaption data-reveal="blur">{personal.location}</figcaption>
      </figure>
      <div className="identity-copy" data-stagger>
        {personal.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <span data-magnetic>
          <a href={personal.resume} download className="text-link">Download resume<ArrowUpRightIcon aria-hidden="true" /></a>
        </span>
      </div>
    </div>
    <div className="scope-section" data-fade-section>
      <h3 data-reveal="3d-flip">{storyCopy.scopeTitle}</h3>
      <dl className="scope-list" data-stagger>
        {engineeringScope.map(item => <div key={item.category} className="glass-panel" data-reveal="3d-depth" data-tilt-3d style={{padding: '24px', borderRadius: '12px'}}>
          <dt>{item.category}</dt>
          <dd>{item.description}</dd>
        </div>)}
      </dl>
    </div>
  </section>;
}
