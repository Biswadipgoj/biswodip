'use client';

import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import { personal, projects, constellation } from '@/lib/data';
import { useExperience } from '../ExperienceProvider';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'success';
  content: string | React.ReactNode;
}

// Illustrative terminal, not a live system shell.
const INITIAL_OUTPUT: TerminalLine[] = [
  {
    id: 'boot-1',
    type: 'output',
    content: (
      <span className="text-slate-400 text-xs font-mono">
        Portfolio terminal demo for <span className="text-white font-bold">{personal.name}</span>. Type{' '}
        <span className="text-cyan-300 font-bold">help</span> to see what it can do.
      </span>
    ),
  },
];

const COMMANDS = [
  { cmd: 'help', label: 'help', desc: 'Available commands' },
  { cmd: 'status', label: 'status', desc: 'Current direction' },
  { cmd: 'stack', label: 'stack', desc: 'Tools by area' },
  { cmd: 'projects', label: 'projects', desc: 'Selected builds' },
  { cmd: 'whoami', label: 'whoami', desc: 'Short profile' },
  { cmd: 'contact', label: 'contact', desc: 'Get in touch' },
  { cmd: 'clear', label: 'clear', desc: 'Clear log' },
];

const HELP_ROWS: Array<[string, string]> = [
  ['status', 'current direction and availability'],
  ['stack', 'tools grouped by area of work'],
  ['projects', 'selected builds'],
  ['whoami', 'short profile'],
  ['contact', 'open the contact section'],
  ['clear', 'clear the terminal'],
];

export default function TerminalDispatch() {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_OUTPUT);
  const [inputVal, setInputVal] = useState('');
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const { animated } = useExperience();

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({ top: terminalContainerRef.current.scrollHeight, behavior: animated ? 'smooth' : 'instant' });
    }
  }, [history, animated]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    const userLine: TerminalLine = {
      id: `usr-${Date.now()}-${Math.random()}`,
      type: 'input',
      content: `$ ${rawCmd}`,
    };

    if (cmd === 'clear') {
      setHistory(INITIAL_OUTPUT);
      setInputVal('');
      return;
    }

    let responseLine: TerminalLine;

    switch (cmd) {
      case 'help':
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-slate-300 text-xs font-mono">
              <p className="text-cyan-400 font-bold uppercase tracking-wider mb-1">{'// available commands'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {HELP_ROWS.map(([name, desc]) => (
                  <div key={name}><span className="text-emerald-400 font-bold">{name}</span> - {desc}</div>
                ))}
              </div>
            </div>
          ),
        };
        break;

      case 'status':
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <p><span className="text-cyan-300 font-bold">ROLE:</span> full-stack software engineer</p>
              <p><span className="text-cyan-300 font-bold">STACK:</span> frontend, backend &amp; APIs, databases, deployment</p>
              <p><span className="text-cyan-300 font-bold">STATUS:</span> open to work — full-time or freelance</p>
              <p><span className="text-cyan-300 font-bold">ALSO:</span> business-analysis skills in progress</p>
              <p className="text-slate-400 mt-1">This is a portfolio demo, not a live monitoring feed.</p>
            </div>
          ),
        };
        break;

      case 'projects':
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1.5 text-xs font-mono text-slate-300">
              <p className="text-cyan-400 font-bold">{'// selected builds'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {projects.map((project, index) => (
                  <a
                    key={project.name}
                    href={`/project/${project.name.toLowerCase().replace(/ /g, '-')}`}
                    className="min-h-11 p-3 rounded bg-slate-700 hover:bg-slate-600 border border-slate-500 block transition-colors focus-visible:outline-cyan-200"
                  >
                    <span className="text-cyan-300 font-bold">[{String(index + 1).padStart(2, '0')}] {project.name}</span>
                    <span className="block text-[0.7rem] text-slate-400">{project.blurb}</span>
                  </a>
                ))}
              </div>
            </div>
          ),
        };
        break;

      case 'stack':
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <p className="text-cyan-400 font-bold">{'// tools by area'}</p>
              {constellation.map((orbit, index) => (
                <p key={orbit.ring}>
                  <span className="text-white font-bold">{String(index + 1).padStart(2, '0')} / {orbit.ring}:</span>{' '}
                  {orbit.crafts.map(craft => craft.name).join(', ')}
                </p>
              ))}
              <p className="text-slate-400">Areas reflect the tools used across the projects, not a certification list.</p>
            </div>
          ),
        };
        break;

      case 'whoami':
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-xs font-mono text-slate-300">
              <p><span className="text-cyan-300 font-bold">NAME:</span> {personal.name}</p>
              <p><span className="text-cyan-300 font-bold">ROLE:</span> {personal.role}</p>
              <p><span className="text-cyan-300 font-bold">EDUCATION:</span> {personal.education}</p>
              <p><span className="text-cyan-300 font-bold">LOCATION:</span> {personal.location}</p>
              <p><span className="text-cyan-300 font-bold">FOCUS:</span> full-stack engineering with business-analysis awareness</p>
            </div>
          ),
        };
        break;

      case 'contact':
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'success',
          content: (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 space-y-2 text-xs font-mono text-emerald-300">
              <p className="font-bold text-sm text-emerald-200">Ready to talk?</p>
              <p className="text-slate-300 leading-relaxed">
                Have a dashboard, internal tool or dataset you want to make more useful? Email{' '}
                <a className="underline" href={`mailto:${personal.email}`}>{personal.email}</a> or use the form.
              </p>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center gap-1 px-3 py-1.5 rounded bg-emerald-300 hover:bg-emerald-200 text-slate-900 font-bold transition-colors"
              >
                Go to contact <span aria-hidden="true">↘</span>
              </a>
            </div>
          ),
        };
        break;

      default:
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <span className="text-rose-400 text-xs font-mono">
              Command not recognized: &apos;{rawCmd}&apos;. Type{' '}
              <button type="button" className="text-cyan-300 font-bold underline" onClick={() => executeCommand('help')}>help</button>{' '}
              to see the available commands.
            </span>
          ),
        };
    }

    setHistory((prev) => [...prev, userLine, responseLine].slice(-80));
    setInputVal('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section aria-labelledby="terminal-title" className="section-shell pb-16 pt-10">
      <div className="dark-stage relative overflow-hidden rounded-2xl border border-slate-400/40 bg-[#263f57]">
        {/* Title bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-500/60 bg-slate-700 px-4 py-4">
          <div className="flex min-w-0 items-center gap-2">
            <h2 id="terminal-title" className="!text-base !tracking-normal !text-slate-100">Portfolio terminal</h2>
          </div>

          <span className="text-sm text-slate-200">Interactive profile, not a system shell</span>
        </div>

        {/* Body */}
        <div
          ref={terminalContainerRef}
          data-lenis-prevent
          role="log"
          aria-label="Portfolio terminal output"
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
          className="dispatch-output h-[260px] space-y-3 overflow-y-auto overscroll-contain p-4 font-mono focus-visible:outline-cyan-200 sm:p-6"
        >
          {history.map((line) => (
            <div key={line.id} className="leading-relaxed">
              {line.type === 'input' ? (
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <span className="select-none text-slate-400">➜</span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">{line.content}</span>
                </div>
              ) : (
                <div className="min-w-0 text-xs text-slate-300 [overflow-wrap:anywhere]">{line.content}</div>
              )}
            </div>
          ))}

        </div>
          <form onSubmit={handleSubmit} className="flex min-w-0 items-center gap-2 border-t border-slate-500/60 px-4 py-3 text-sm sm:px-6">
            <span className="select-none font-bold text-emerald-400">➜</span>
            <span className="select-none font-bold text-cyan-400">~</span>
            <input
              id="dispatch-command"
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              placeholder="Type 'help' to start"
              className="min-h-11 min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-2 font-mono text-base text-slate-50 placeholder:text-slate-300 focus-visible:outline-cyan-200"
              autoComplete="off"
              autoCapitalize="none"
              enterKeyHint="send"
              maxLength={160}
              spellCheck="false"
              aria-label="Terminal command input"
            />
            <button type="submit" className="min-h-11 shrink-0 rounded-lg bg-cyan-200 px-4 text-sm font-semibold text-slate-900 hover:bg-cyan-100 focus-visible:outline-cyan-200">Run</button>
          </form>

        {/* Command chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-500/60 bg-slate-700 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-xs tracking-wider text-slate-400">Commands:</span>
            {COMMANDS.map((item) => (
              <button
                key={item.cmd}
                type="button"
                title={item.desc}
                onClick={() => executeCommand(item.cmd)}
                className="inline-flex min-h-11 items-center gap-1 rounded-lg border border-slate-500 px-3 py-2 font-mono text-sm text-slate-100 transition-colors hover:border-cyan-200 hover:bg-slate-600 focus-visible:outline-cyan-200"
              >
                <span className="font-bold text-cyan-400">$</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden font-mono text-xs text-slate-400 md:block">
            <span>Press Enter ↵ to run</span>
          </div>
        </div>
      </div>
    </section>
  );
}
