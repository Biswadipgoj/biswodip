'use client';
import Image from 'next/image';
import { personal } from '@/lib/data';
import { ArrowDownIcon } from '@/components/icons';
import { useEditorialReveal } from '@/components/cinematic/useScene';

export default function Identity() {
  const ref = useEditorialReveal();
  return (
    <section ref={ref} id="about" className="identity section-space" data-environment="apricot">
      <div id="identity" className="identity-composition">
        <div className="identity-name" data-reveal>
          <h2>Biswodip<br /><em>Goj.</em></h2>
          <p>{personal.role}</p>
        </div>
        <figure className="identity-portrait" data-reveal>
          <Image src="/biswodip.png" alt="Portrait of Biswodip Goj, full-stack software engineer" fill priority sizes="(max-width: 799px) 85vw, 46vw" />
          <figcaption>{personal.location}</figcaption>
        </figure>
        <div className="identity-note" data-reveal>
          <span className="small-label">The person behind the code</span>
          <p>Full-stack software, designed and shipped.</p>
          <ArrowDownIcon aria-hidden="true" />
        </div>
      </div>
      <div className="identity-copy" data-reveal>
        <p className="intro-copy">{personal.intro}</p>
        <div>
          <p>{personal.about}</p>
          <a className="text-link" href="#stack">Inspect the stack<ArrowDownIcon aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
