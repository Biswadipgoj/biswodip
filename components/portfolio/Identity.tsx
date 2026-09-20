'use client';
import Image from 'next/image';
import { personal, engineeringScope, projects, socials, education, portfolioCopy } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { AnimatedText } from '@/components/cinematic/AnimatedText';
import { ArrowUpRightIcon } from '@/components/icons';

export default function Identity() {
  const ref = useEditorialReveal();
  return <section ref={ref} id="about" className="identity section-space" data-motion-root>
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ top: '15%', right: '5%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(179, 207, 190, 0.65), transparent 70%)' }} aria-hidden="true" />
    <div className="spatial-ambient-orb" data-spatial="orb" style={{ bottom: '10%', left: '8%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(235, 215, 170, 0.55), transparent 70%)' }} aria-hidden="true" />
    <div className="identity-composition" id="identity">
      <div className="identity-intro">
        <p className="section-index">01 / The engineer</p>
        <h2><AnimatedText>{portfolioCopy.identity}</AnimatedText></h2>
        <p data-reveal>{personal.intro}</p>
        <div className="identity-facts" data-stagger><span>B.Tech CSE<strong>{education[0].institution} · 2024</strong></span><span>Based in<strong>West Bengal, India</strong></span><span>Portfolio<strong>{projects.length} live applications</strong></span></div>
        <div className="identity-links"><a href={socials[1].url} className="text-link" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRightIcon aria-hidden="true"/></a><a href={socials[2].url} className="text-link" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRightIcon aria-hidden="true"/></a><a href="#projects" className="text-link">Explore projects<ArrowUpRightIcon aria-hidden="true"/></a></div>
      </div>
      <figure className="identity-portrait" data-media data-spatial="card">
        <div className="portrait-sheet" aria-hidden="true" data-parallax="25" data-plane="-1"/>
        <div data-depth="portrait"><Image src="/biswodip.png" alt="Biswodip Goj, full-stack software engineer" width={1086} height={1448} sizes="(max-width: 799px) 82vw, 32vw"/></div>
        <figcaption><span>Biswodip Goj</span><span>{personal.location}</span></figcaption>
      </figure>
    </div>
    <div className="identity-statement"><p data-reveal>{personal.about[0]}</p><p data-reveal>{personal.about[2]}</p></div>
    <dl className="scope-list" data-spatial="stagger-3d">{engineeringScope.map((item,i)=><div key={item.category} data-spatial="card"><span className="scope-number" aria-hidden="true">0{i+1}</span><dt>{item.category}</dt><dd>{item.description}</dd></div>)}</dl>
  </section>;
}
