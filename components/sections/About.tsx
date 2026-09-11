'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Image from 'next/image';
import { personal, facts, experienceCopy, projects, constellation } from '@/lib/data';
import Icon from '../ui/Icon';
import Sticker from '../ui/Sticker';
import { Spatial, Stagger, StaggerItem, Parallax, CountUp } from '../ui/Spatial';

export default function About() {
  const [history, setHistory] = useState(['Biswodip Goj / interactive profile', 'Type "help" to explore.']);
  const [input, setInput] = useState('');
  const output = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [history]);

  function command(value: string) {
    const cmd = value.trim().toLowerCase();
    const responses: Record<string, string[]> = {
      help: ['Commands: about, skills, projects, contact, clear, secret'],
      about: [personal.name, personal.role, personal.location, personal.education],
      skills: constellation.map(orbit => `${orbit.ring}: ${orbit.crafts.slice(0, 3).map(craft => craft.name).join(', ')}`),
      projects: projects.map(project => `${project.name}: ${project.url}`),
      contact: [personal.email, 'github.com/Biswadipgoj'],
      secret: ['No hidden framework. Just curiosity, a compiler, and another idea.'],
    };
    setHistory(previous => cmd === 'clear' ? [] : [...previous, `$ ${value}`, ...(responses[cmd] || [cmd ? `Unknown command: ${cmd}. Try help.` : ''])].slice(-100));
    setInput('');
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    command(input);
  }

  return (
    <section id="about" className="section-shell section-space spatial-stage">
      <Spatial>
        <p className="eyebrow">01 / The engineer</p>
      </Spatial>

      <div className="about-grid">
        <Spatial className="profile" depth={1.1}>
          <Parallax distance={26}>
            <div className="portrait">
              <Image src="/biswodip.png" alt="Biswodip Goj" fill sizes="(max-width: 980px) 80vw, 30vw" className="object-cover" />
            </div>
          </Parallax>
          <span className="float-art art-terminal"><Sticker name="terminal" size={56} /></span>
          <div className="profile-caption">
            <strong>{personal.name}</strong>
            <span>{personal.location}</span>
          </div>
        </Spatial>

        <div className="about-copy">
          <Spatial delay={0.08}>
            <h2>{experienceCopy.about.title}</h2>
          </Spatial>
          <Stagger gap={0.09}>
            <StaggerItem as="p" className="body-lg">{personal.about}</StaggerItem>
            <StaggerItem as="p">{personal.role}. {personal.aspiration}.</StaggerItem>
            <StaggerItem as="p" className="education">{personal.education}</StaggerItem>
            <StaggerItem>
              <a href="#contact" className="text-link">Start a conversation <Icon name="arrowUpRight" /></a>
            </StaggerItem>
          </Stagger>

          <Spatial delay={0.1}>
            <div className="terminal" data-lenis-prevent>
              <div className="terminal-bar">
                <span>~/biswodip/profile</span>
                <button onClick={() => command('clear')} type="button">Clear</button>
              </div>
              <div ref={output} className="terminal-output" role="log" aria-label="Terminal output" aria-live="polite">
                {history.map((line, i) => <div key={i}>{line || '\u00a0'}</div>)}
              </div>
              <form onSubmit={submit} className="terminal-input">
                <label htmlFor="terminal-command">$</label>
                <input id="terminal-command" aria-label="Terminal command" value={input} onChange={event => setInput(event.target.value)} placeholder="Type a command..." autoComplete="off" spellCheck={false} />
                <button type="submit" aria-label="Run command"><Icon name="arrowUpRight" /></button>
              </form>
              <div className="terminal-commands">
                {['help', 'about', 'skills', 'projects', 'contact'].map(cmd => (
                  <button type="button" key={cmd} onClick={() => command(cmd)}>{cmd}</button>
                ))}
              </div>
            </div>
          </Spatial>
        </div>
      </div>

      <Stagger className="facts-grid" gap={0.09}>
        {facts.map(fact => (
          <StaggerItem className="fact" key={fact.label}>
            <strong><CountUp value={fact.figure} /></strong>
            <h3>{fact.label}</h3>
            <p>{fact.detail}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
