'use client';
import Image from 'next/image';
import { personal, principles, processStages, journey, socials } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';
import { FlowLine } from '@/components/cinematic/SoftwarePrimitives';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function Process() {
  const ref = useEditorialReveal();
  return <section id="process" ref={ref} className="process-section section-space" data-environment="lavender">
    <div className="process-introduction" data-reveal><h2>Good software<br /><em>starts before code.</em></h2><p>The same route, from the first question<br />to the next useful version.</p></div>
    <div className="process-composition">
      <div className="process-document"><div className="document-tab">requirement.md</div><h3>Make the problem<br />clear enough to build.</h3><div className="requirement-lines"><span>Who is using it?</span><span>What needs to happen?</span><span>What could go wrong?</span></div><div className="document-build"><code>idea → scope → system</code><ArrowDownIcon aria-hidden="true" /><code>code → check → ship</code></div><p>Then listen. Improve. Repeat.</p></div>
      <ol className="process-steps">{processStages.map((stage, i) => <li key={stage.title} data-reveal><span className="process-index">0{i + 1}</span><div><h3>{stage.title}</h3><p>{stage.body}</p><code>{stage.artifact}</code></div></li>)}</ol>
    </div>
    <div className="process-loop" data-reveal><FlowLine steps={['Requirement', 'Scope', 'Architecture', 'Implementation', 'Build', 'Deploy', 'Feedback', 'Iteration']} /></div>
    <div className="engineering-principles" id="capabilities">{principles.map(principle => <div key={principle.title} data-reveal><span>{principle.title}</span><h3>{principle.line}</h3></div>)}</div>
  </section>;
}

export function Journey() {
  const ref = useEditorialReveal();
  return <section id="journey" ref={ref} className="journey-section section-space" data-environment="cream">
    <header data-reveal><h2>Still building.<br /><em>Still becoming.</em></h2><p>The foundations, the degree,<br />and the work that continues.</p></header>
    <ol className="education-timeline">{journey.map(entry => <li key={entry.date} data-reveal><span className="education-year">{entry.date}</span><div><h3>{entry.title}</h3>{'detail' in entry ? <><p className="education-degree">{entry.detail.title}</p><p>{entry.detail.institution}</p><span className="education-subtitle">{entry.detail.subtitle}</span><Accordion type="single" collapsible className="coursework"><AccordionItem value="subjects"><AccordionTrigger>Coursework</AccordionTrigger><AccordionContent><ul>{entry.detail.coursework.map(subject => <li key={subject}>{subject}</li>)}</ul></AccordionContent></AccordionItem></Accordion></> : <p>{entry.body}</p>}</div></li>)}</ol>
  </section>;
}

export function Contact() {
  const ref = useEditorialReveal();
  return <footer id="contact" ref={ref} className="contact-section" data-environment="sky">
    <div className="contact-portrait-composition"><div className="contact-person" data-reveal><h2>Behind every<br />build, <em>a person.</em></h2><p>{personal.name}<br />{personal.role}</p></div><figure className="contact-portrait" data-reveal><Image src="/biswodip.png" alt="Biswodip Goj" fill sizes="(max-width: 799px) 88vw, 45vw" /></figure><div className="contact-software-note" aria-hidden="true"><span>interface</span><span>application</span><span>data</span><span>person</span></div></div>
    <div className="contact-details" data-reveal><p>Have something to build?</p><a className="contact-email" href={`mailto:${personal.email}`}>{personal.email}<ArrowUpRightIcon aria-hidden="true" /></a><div className="contact-bottom"><span>{personal.location}</span><nav aria-label="Social links">{socials.filter(social => social.label !== 'Email').map(social => <a href={social.url} key={social.label} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRightIcon aria-hidden="true" /></a>)}</nav><a href="#opening" className="back-to-top">Back to top<ArrowUpRightIcon aria-hidden="true" /></a></div><div className="contact-signature" aria-hidden="true">biswodip<span>.</span></div></div>
  </footer>;
}
