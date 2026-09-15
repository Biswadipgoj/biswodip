'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { personal, experienceCopy } from '@/lib/data';
import Icon from '../ui/Icon';
import { Spatial, Stagger, StaggerItem } from '../ui/Spatial';

const INQUIRY_INTENTS = [
  'Full-stack build',
  'Frontend engineering',
  'Backend & APIs',
  'Database / data work',
  'Consulting & analysis',
];

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  const [draft, setDraft] = useState('');
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [localIST, setLocalIST] = useState('');

  useEffect(() => {
    const updateTime = () => setLocalIST(new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: true,
    }));
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopyStatus(`Copied ${personal.email}`);
    } catch {
      setCopyStatus('Copy was blocked. Select the email address above to copy it manually.');
    }
  }

  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const messageField = event.currentTarget.elements.namedItem('message') as HTMLTextAreaElement;
    if (message.trim().length < 5) {
      messageField.setCustomValidity('Please describe your project in at least five non-space characters.');
      messageField.reportValidity();
      return;
    }
    const scope = selectedIntents.length ? `\n\nProject scope: ${selectedIntents.join(', ')}` : '';
    const body = `${message.trim()}${scope}\n\nFrom: ${name.trim()}\nReply to: ${email.trim()}`;
    const subject = `Project inquiry from ${name.trim()}`;
    const url = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft(url);
    window.location.href = url;
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-shell section-space spatial-stage">
      <div className="contact-grid">
        <div className="contact-copy">
          <Spatial><h2 id="contact-title">{experienceCopy.contact.title}</h2></Spatial>
          <Stagger gap={0.08} className="mt-6 space-y-6">
            <StaggerItem as="p" className="body-lg">{experienceCopy.contact.description}</StaggerItem>
            <StaggerItem>
              <a className="contact-email !mt-0 min-h-11 max-w-full" href={`mailto:${personal.email}`}>
                <span className="min-w-0 [overflow-wrap:anywhere]">{personal.email}</span><Icon name="arrowUpRight" />
              </a>
              <div className="mt-3">
                <button className="text-link" onClick={copyEmail} type="button"><Icon name="copy" /> Copy email address</button>
              </div>
              <p className="copy-status min-h-6 !text-sm" role="status">{copyStatus}</p>
            </StaggerItem>
            <StaggerItem>
              <div className="border-t border-[var(--edge-2)] pt-5">
                <p>{personal.location}</p>
                <p className="mt-1 !text-sm">{localIST ? `${localIST} IST / Local time` : 'India Standard Time / UTC+05:30'}</p>
                <p className="mt-4 !text-sm">{experienceCopy.contact.formNote}</p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>

        <Spatial depth={0.5} delay={0.08}>
          <form className="contact-form" onSubmit={compose} onChange={() => setDraft('')} aria-describedby="contact-form-note">
            <h3>Tell me about your project</h3>
            <p id="contact-form-note">This opens your email app. Nothing is sent or stored by this site.</p>
            <fieldset className="mt-6 min-w-0 border-0 p-0">
              <legend className="mb-3 text-sm font-semibold">What do you need? <span className="font-normal">(optional)</span></legend>
              <div className="flex flex-wrap gap-2">
                {INQUIRY_INTENTS.map(intent => {
                  const selected = selectedIntents.includes(intent);
                  return <button
                    key={intent}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedIntents(previous => selected ? previous.filter(item => item !== intent) : [...previous, intent]);
                      setDraft('');
                    }}
                    className={`min-h-11 rounded-lg border px-3 py-2 text-sm ${selected ? 'border-cyan-200 bg-cyan-200 font-semibold text-slate-900' : 'border-[var(--edge-2)] text-[var(--ink)] hover:border-[var(--accent)]'}`}
                  >{intent}</button>;
                })}
              </div>
            </fieldset>
            <label htmlFor="contact-name">Your name (required)</label>
            <input id="contact-name" name="name" value={name} onChange={event => setName(event.target.value)} autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Alex Morgan" />
            <label htmlFor="contact-email">Email address (required)</label>
            <input id="contact-email" name="email" value={email} onChange={event => setEmail(event.target.value)} type="email" autoComplete="email" required maxLength={200} placeholder="alex@company.com" />
            <label htmlFor="contact-message">Project or role (required)</label>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={event => { setMessage(event.target.value); event.target.setCustomValidity(''); }}
              required
              minLength={5}
              maxLength={3000}
              rows={5}
              placeholder="What are you building, and where could I help?"
            />
            <button type="submit" className="btn-primary">Compose email <Icon name="arrowUpRight" /></button>
            {draft && <div className="form-status mt-4 text-sm" role="status">
              Your draft is ready, but has not been sent. <a href={draft} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Reopen your email app</a> to review and send it.
            </div>}
          </form>
        </Spatial>
      </div>
    </section>
  );
}
