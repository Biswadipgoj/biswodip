'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import Image from 'next/image';
import { personal, facts, experienceCopy, projects, constellation } from '@/lib/data';
import Icon from '../ui/Icon';
import { Spatial, Stagger, StaggerItem, CountUp } from '../ui/Spatial';
import { useExperience } from '../ExperienceProvider';

export default function About() {
  const [history, setHistory] = useState(['Biswodip Goj / interactive profile', 'Type "help" to explore.']);
  const [input, setInput] = useState('');
  const output = useRef<HTMLDivElement>(null);
  const { animated } = useExperience();

  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [history]);

  function command(value: string) {
    const cmd = value.trim().toLowerCase();
    if (!cmd) return;
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
    <section id="about" aria-labelledby="about-title" className="section-shell section-space spatial-stage">
      <div className="about-grid">
        <Spatial className="profile" depth={1.1}>
          <div className="portrait">
            <Image src="/biswodip.png" alt="Biswodip Goj" fill sizes="(max-width: 480px) 90vw, (max-width: 980px) 400px, 30vw" className="object-cover" />
          </div>
          <div className="profile-caption">
            <strong>{personal.name}</strong>
            <span>{personal.location}</span>
          </div>
        </Spatial>

        <div className="about-copy">
          <Spatial delay={0.08}>
            <h2 id="about-title">{experienceCopy.about.title}</h2>
          </Spatial>
          <Stagger gap={0.09} className="mt-5 space-y-4">
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
                <button onClick={() => command('clear')} type="button" className="!min-h-11">Clear</button>
              </div>
              <div ref={output} className="terminal-output" role="log" tabIndex={0} aria-label="Profile terminal output" aria-live="polite">
                {history.map((line, i) => <div key={i} style={{ animation: animated ? undefined : 'none' }}>{line || '\u00a0'}</div>)}
              </div>
              <form onSubmit={submit} className="terminal-input">
                <label htmlFor="terminal-command">$</label>
                <input id="terminal-command" aria-label="Terminal command" value={input} onChange={event => setInput(event.target.value)} placeholder="Type a command..." autoComplete="off" autoCapitalize="none" enterKeyHint="send" maxLength={160} spellCheck={false} className="!min-h-11 !text-base" />
                <button type="submit" aria-label="Run command" className="!min-h-11 !min-w-11"><Icon name="arrowUpRight" /></button>
              </form>
              <div className="terminal-commands">
                {['help', 'about', 'skills', 'projects', 'contact'].map(cmd => (
                  <button type="button" key={cmd} onClick={() => command(cmd)} className="!min-h-11">{cmd}</button>
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
