'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { personal, experienceCopy } from '@/lib/data';
import Icon from '../ui/Icon';
import { Spatial, Stagger, StaggerItem } from '../ui/Spatial';
import { AudioEngine } from '../ui/AudioFeedback';

const INQUIRY_INTENTS = [
  '⚡ Full-Stack Architecture',
  '☁️ Distributed Systems',
  '📊 Systems Analysis',
  '🚀 Founding Engineer / MVP',
  '🤝 Advisory & Consulting',
];

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  const [draft, setDraft] = useState('');
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [localIST, setLocalIST] = useState('');
  const [solarStatus, setSolarStatus] = useState({ icon: '☀️', text: 'Daylight Phase' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalIST(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
          hour12: true,
        })
      );
      // Determine solar status in Uluberia, West Bengal (UTC+5:30)
      const istHour = (now.getUTCHours() + 5.5) % 24;
      if (istHour >= 6 && istHour < 17.5) {
        setSolarStatus({ icon: '☀️', text: 'Active Daylight Phase' });
      } else if (istHour >= 17.5 && istHour < 19) {
        setSolarStatus({ icon: '🌅', text: 'Golden Hour Transition' });
      } else {
        setSolarStatus({ icon: '🌙', text: 'Night Vigil / High Latency Batch' });
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleIntent = (intent: string) => {
    AudioEngine.playClick();
    setSelectedIntents((prev) => {
      const exists = prev.includes(intent);
      const next = exists ? prev.filter((i) => i !== intent) : [...prev, intent];
      return next;
    });
  };

  async function copyEmail() {
    AudioEngine.playChime();
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopyStatus('Email protocol copied: biswodipgoj@gmail.com');
      setTimeout(() => setCopyStatus(''), 4000);
    } catch {
      setCopyStatus('Select the email address to copy it manually.');
    }
  }

  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    AudioEngine.playChime();
    if (!name || !email || message.length < 5) return;

    const intentTags = selectedIntents.length > 0 ? `\n\n[Project Scope]: ${selectedIntents.join(', ')}` : '';
    const fullBody = `${message}${intentTags}\n\nFrom: ${name}\nReply to: ${email}`;
    const subject = selectedIntents.length > 0 
      ? `Project Inquiry: ${selectedIntents[0]} - ${name}`
      : `Project inquiry from ${name}`;

    const url = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
    setDraft(url);
    window.location.href = url;
  }

  return (
    <section id="contact" className="section-shell section-space spatial-stage">
      <Spatial>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <p className="eyebrow !m-0">06 / Signal Transmission Deck</p>
        </div>
      </Spatial>

      <div className="contact-grid">
        {/* Left Column: Systems Telemetry & Direct Protocols */}
        <div className="contact-copy space-y-6">
          <Spatial>
            <h2>{experienceCopy.contact.title}</h2>
          </Spatial>

          <Stagger gap={0.08}>
            <StaggerItem as="p" className="body-lg">
              {experienceCopy.contact.description}
            </StaggerItem>

            {/* Live Uluberia Radar Beacon Widget */}
            <StaggerItem>
              <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/50 border border-white/60 dark:border-slate-800/80 backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {/* Animated Radar Sweep Icon */}
                    <div className="relative w-7 h-7 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border border-emerald-500/40">
                      <div className="absolute inset-0 border border-emerald-500/30 rounded-full" />
                      <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <div
                        className="absolute inset-0 origin-center"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 70%, rgba(16,185,129,0.5) 100%)',
                          animation: 'spin 3s linear infinite',
                        }}
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                        ULUBERIA NODE · 22.4735° N, 88.1077° E
                      </span>
                      <span className="block text-[0.68rem] font-mono text-slate-500">
                        WEST BENGAL, INDIA · {solarStatus.icon} {solarStatus.text}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{localIST || '18:00 IST'}</span>
                  </div>
                </div>

                <div className="pt-3 grid grid-cols-2 gap-2 text-[0.7rem] font-mono text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>CARRIER: 99.99% ONLINE</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-500">⚡</span>
                    <span>TURNAROUND: &lt; 4 HOURS</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Direct Email Action Link */}
            <StaggerItem>
              <div className="pt-2">
                <a className="contact-email text-lg sm:text-xl font-bold font-mono tracking-tight" href={`mailto:${personal.email}`}>
                  <span>{personal.email}</span>
                  <Icon name="arrowUpRight" />
                </a>
              </div>
            </StaggerItem>

            {/* One-Click Copy Protocol Button */}
            <StaggerItem>
              <div className="flex items-center gap-3">
                <button
                  className="px-3.5 py-2 rounded-xl bg-white/70 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-700 text-xs font-mono font-medium text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 flex items-center gap-2"
                  onClick={copyEmail}
                  type="button"
                >
                  <Icon name="copy" />
                  <span>Copy email protocol</span>
                </button>
              </div>
              {copyStatus && (
                <p className="copy-status mt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400" role="status">
                  ✓ {copyStatus}
                </p>
              )}
            </StaggerItem>

            <StaggerItem>
              <p className="contact-location text-xs font-mono text-slate-500">
                <i className="status-dot" />
                <span>{personal.location} · Distributed Remote &amp; Onsite Availability</span>
              </p>
            </StaggerItem>
          </Stagger>
        </div>

        {/* Right Column: High-Fidelity Signal Dispatch Form */}
        <Spatial depth={1.1} delay={0.08}>
          <form className="contact-form shadow-2xl relative overflow-hidden" onSubmit={compose}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-slate-800">
              <h3 className="text-xl font-bold tracking-tight !text-[#15173a] dark:!text-white">
                Initiate Project Transmission
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[0.68rem] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                DISPATCH READY
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2 mb-4">
              Select inquiry scope to automatically tag transmission telemetry:
            </p>

            {/* Inquiry Scope Selector Chips */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {INQUIRY_INTENTS.map((intent) => {
                const isSelected = selectedIntents.includes(intent);
                return (
                  <button
                    key={intent}
                    type="button"
                    onClick={() => toggleIntent(intent)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 border ${
                      isSelected
                        ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/80'
                    }`}
                  >
                    <span>{intent}</span>
                    {isSelected && <span className="ml-1 text-cyan-200 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-400">
              Your Name / Organization
            </label>
            <input
              id="contact-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              maxLength={100}
              placeholder="e.g. Alex Morgan / Engineering Lead"
              pattern=".*\S.*"
              className="mt-1"
            />

            <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-400 mt-4">
              Return Email Channel
            </label>
            <input
              id="contact-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="alex@company.com"
              className="mt-1"
            />

            <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-400 mt-4">
              Architecture Scope &amp; Deliverables
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minLength={5}
              maxLength={3000}
              rows={4}
              placeholder="Describe the problem, the architectural target, or the high-impact engineering role..."
              className="mt-1"
            />

            <button
              type="submit"
              className="btn-primary w-full mt-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.99]"
            >
              <span>Transmit Signal to Biswodip</span>
              <Icon name="arrowUpRight" />
            </button>

            {draft && (
              <div className="form-status mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-start gap-2" role="status">
                <span>✓</span>
                <div>
                  Transmission payload assembled.{' '}
                  <a href={draft} className="font-bold underline text-emerald-600 dark:text-emerald-400">
                    Open in default mail client
                  </a>{' '}
                  to dispatch directly.
                </div>
              </div>
            )}
          </form>
        </Spatial>
      </div>
    </section>
  );
}
