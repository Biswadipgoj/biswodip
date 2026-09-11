'use client';

import React, { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personal } from '@/lib/data';
import { AudioEngine } from '../ui/AudioFeedback';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'success' | 'matrix';
  content: string | React.ReactNode;
}

const INITIAL_OUTPUT: TerminalLine[] = [
  {
    id: 'boot-1',
    type: 'system',
    content: (
      <div className="text-slate-400 font-mono text-xs leading-relaxed">
        <span className="text-cyan-400 font-bold">┌─────────────────────────────────────────────────────────────┐</span><br />
        <span className="text-cyan-400 font-bold">│</span>{' '}
        <span className="text-white font-bold">BISWODIP GOJ // ARCHITECTURAL KERNEL DISPATCH v2.6.4</span>{'        '}<span className="text-cyan-400 font-bold">│</span><br />
        <span className="text-cyan-400 font-bold">│</span>{' '}
        <span className="text-emerald-400">● REGION: ULUBERIA, WB, IN (22.4735° N) · 120 FPS RUNTIME</span>{' '}<span className="text-cyan-400 font-bold">│</span><br />
        <span className="text-cyan-400 font-bold">└─────────────────────────────────────────────────────────────┘</span>
      </div>
    ),
  },
  {
    id: 'boot-2',
    type: 'system',
    content: (
      <span className="text-slate-400 text-xs font-mono">
        Interactive session established. Type <span className="text-cyan-300 font-bold">&apos;help&apos;</span> or select any protocol shortcut below.
      </span>
    ),
  },
];

const PRESET_COMMANDS = [
  { cmd: 'status', label: 'status', desc: 'Runtime metrics' },
  { cmd: 'ping', label: 'ping', desc: 'Latency test' },
  { cmd: 'stack', label: 'stack', desc: 'Layer map' },
  { cmd: 'projects', label: 'projects', desc: 'Build fleet' },
  { cmd: 'sudo hire biswodip', label: 'sudo hire', desc: 'Handshake protocol' },
  { cmd: 'matrix', label: 'matrix', desc: 'Data stream' },
  { cmd: 'clear', label: 'clear', desc: 'Purge log' },
];

export default function TerminalDispatch() {
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_OUTPUT);
  const [inputVal, setInputVal] = useState('');
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [pingLatency, setPingLatency] = useState<number | null>(12);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  const executeCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    AudioEngine.playClick();

    // Append user input to log
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
              <p className="text-cyan-400 font-bold uppercase tracking-wider mb-1">{'// AVAILABLE SYSTEM PROTOCOLS'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                <div><span className="text-emerald-400 font-bold">status</span> - Core architecture &amp; engine health</div>
                <div><span className="text-emerald-400 font-bold">ping</span> - Real-time edge latency round-trip</div>
                <div><span className="text-emerald-400 font-bold">stack</span> - 4-layer technical systems schematic</div>
                <div><span className="text-emerald-400 font-bold">projects</span> - Direct navigation to 5 flagship builds</div>
                <div><span className="text-emerald-400 font-bold">whoami</span> - Biswodip Goj specification profile</div>
                <div><span className="text-emerald-400 font-bold">sudo hire biswodip</span> - Launch enterprise hiring handshake</div>
                <div><span className="text-emerald-400 font-bold">matrix</span> - Digital binary rain simulation</div>
                <div><span className="text-emerald-400 font-bold">clear</span> - Flush the terminal buffer</div>
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
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>STATE: ALL ARCHITECTURAL SUBSYSTEMS NOMINAL</span>
              </div>
              <div className="border-l-2 border-emerald-500/40 pl-3 space-y-1 mt-2 text-slate-300">
                <p>• <span className="text-slate-400">Kernel:</span> Next.js 14 App Router · React Server Components (RSC)</p>
                <p>• <span className="text-slate-400">3D Acceleration:</span> WebGL 2.0 / Three.js 60–120 FPS Target</p>
                <p>• <span className="text-slate-400">Node Edge Region:</span> Uluberia, West Bengal, IN (UTC +05:30) · Kolkata Metro Node</p>
                <p>• <span className="text-slate-400">Security Invariant:</span> Multi-Tenant Postgres Row-Level Security (RLS)</p>
                <p>• <span className="text-slate-400">Current Availability:</span> Full-Time High-Impact Roles &amp; Founding Architecture</p>
              </div>
            </div>
          ),
        };
        break;

      case 'ping': {
        const start = performance.now();
        // Simulate or probe actual round-trip
        await new Promise((r) => setTimeout(r, 60));
        const duration = Math.round(performance.now() - start);
        setPingLatency(duration);

        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-xs font-mono text-slate-300">
              <p className="text-cyan-400 font-bold">PING uluberia-edge-gateway (22.4735° N, 88.1077° E): 56 data bytes</p>
              <p className="text-slate-400">64 bytes from uluberia-edge-01: icmp_seq=1 ttl=58 time={duration}ms</p>
              <p className="text-slate-400">64 bytes from uluberia-edge-01: icmp_seq=2 ttl=58 time={Math.max(9, duration - 2)}ms</p>
              <p className="text-emerald-400 font-semibold mt-1">
                --- 2 packets transmitted, 2 received, 0% packet loss, avg = {duration}ms ---
              </p>
            </div>
          ),
        };
        break;
      }

      case 'stack':
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-xs font-mono text-slate-300">
              <p className="text-cyan-400 font-bold">{'// 4-LAYER PRODUCTION ARCHITECTURE'}</p>
              <div className="space-y-1.5 mt-2 border-l-2 border-cyan-500/30 pl-3">
                <p><span className="text-white font-bold">01 / FRONTEND:</span> Next.js 14, TypeScript, Three.js, Tailwind, Framer Motion</p>
                <p><span className="text-white font-bold">02 / BACKEND:</span> Node.js, Express, Go, Python FastAPI, PostgreSQL, Redis</p>
                <p><span className="text-white font-bold">03 / DEVOPS:</span> Docker, Kubernetes, AWS (S3, CloudFront), GitHub Actions, Nginx</p>
                <p><span className="text-white font-bold">04 / DATA &amp; AI:</span> Vector Embeddings, Kafka, PyTorch, ClickHouse, REST/gRPC</p>
              </div>
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
              <p className="text-cyan-400 font-bold">{'// REGISTERED FLAGSHIP BUILDS'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <a href="#projects" className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 block transition-colors">
                  <span className="text-cyan-300 font-bold">[01] Erpixa</span>
                  <span className="block text-[0.7rem] text-slate-400">Modular Multi-Tenant ERP · Postgres RLS</span>
                </a>
                <a href="#projects" className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 block transition-colors">
                  <span className="text-cyan-300 font-bold">[02] TelePoint</span>
                  <span className="block text-[0.7rem] text-slate-400">Real-Time Communication &amp; Telemetry Hub</span>
                </a>
                <a href="#projects" className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 block transition-colors">
                  <span className="text-cyan-300 font-bold">[03] TripMate</span>
                  <span className="block text-[0.7rem] text-slate-400">Spatial Itinerary Engine &amp; Geo-Intelligence</span>
                </a>
                <a href="#projects" className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 block transition-colors">
                  <span className="text-cyan-300 font-bold">[04] NanoLink</span>
                  <span className="block text-[0.7rem] text-slate-400">High-Throughput Analytics &amp; URL Broker</span>
                </a>
                <a href="#projects" className="p-2 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 block transition-colors sm:col-span-2">
                  <span className="text-cyan-300 font-bold">[05] Nexora</span>
                  <span className="block text-[0.7rem] text-slate-400">Distributed Cloud Task Broker &amp; Worker Mesh</span>
                </a>
              </div>
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
              <p><span className="text-cyan-300 font-bold">NAME:</span> Biswodip Goj</p>
              <p><span className="text-cyan-300 font-bold">DEGREE:</span> B.Tech Computer Science &amp; Engineering</p>
              <p><span className="text-cyan-300 font-bold">FOCUS:</span> Full-Stack Architecture · Distributed Systems · Business Analysis</p>
              <p><span className="text-cyan-300 font-bold">LOCATION:</span> Uluberia, West Bengal, India</p>
              <p><span className="text-cyan-300 font-bold">MOTTO:</span> &ldquo;Scale with mathematical rigor. Ship with zero bloat.&rdquo;</p>
            </div>
          ),
        };
        break;

      case 'sudo hire biswodip':
      case 'hire':
      case 'sudo hire':
        AudioEngine.playChime();
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'success',
          content: (
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 space-y-2 text-xs font-mono text-emerald-300">
              <p className="font-bold text-sm text-emerald-200">
                ✨ [AUTHENTICATED]: HIRING HANDSHAKE INITIALIZED!
              </p>
              <p className="text-slate-300 leading-relaxed">
                Candidate: <strong className="text-white">Biswodip Goj</strong> (Full-Stack Engineer &amp; Systems Architect)
                <br />
                Status: Qualified for Senior/Founding Full-Stack, Backend, and Distributed Systems roles.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${personal.email}?subject=${encodeURIComponent('High-Impact Engineering Role for Biswodip Goj')}&body=${encodeURIComponent('Hi Biswodip,\n\nWe reviewed your portfolio and distributed architecture projects. We would love to schedule an introductory conversation regarding our engineering roadmap.\n\nBest regards,')}`}
                  className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors inline-flex items-center gap-1"
                >
                  <span>Dispatch Direct Email Handshake</span>
                  <span>↗</span>
                </a>
                <span className="text-emerald-400/80 text-[0.7rem]">Direct priority queue</span>
              </div>
            </div>
          ),
        };
        break;

      case 'matrix':
        setIsMatrixActive(true);
        setTimeout(() => setIsMatrixActive(false), 4500);
        responseLine = {
          id: `out-${Date.now()}`,
          type: 'matrix',
          content: (
            <div className="text-emerald-400 font-mono text-xs overflow-hidden leading-tight animate-pulse py-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="truncate opacity-90">
                  {Array.from({ length: 48 })
                    .map(() => Math.random() > 0.5 ? '1' : '0')
                    .join(' ')}
                </div>
              ))}
              <p className="text-cyan-300 font-bold mt-2">{'// MATRIX STREAM COMPLETED · ENCRYPTION VERIFIED'}</p>
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
              Command not recognized: &apos;{rawCmd}&apos;. Type <span className="text-cyan-300 font-bold underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> to view supported protocols.
            </span>
          ),
        };
    }

    setHistory((prev) => [...prev, userLine, responseLine]);
    setInputVal('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px]" />

      {/* Terminal Container */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3 select-none">
          {/* macOS window controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block border border-rose-600 shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block border border-amber-600 shadow-inner" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block border border-emerald-600 shadow-inner" />
            <span className="ml-3 text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-400">terminal@</span>
              <span className="text-cyan-400">biswodip-kernel</span>
              <span className="text-slate-400">:</span>
              <span className="text-purple-400">~/dispatch</span>
            </span>
          </div>

          {/* Right side telemetry */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>TLS 1.3 Active</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-400 font-semibold">
              <span>⚡</span>
              <span>{pingLatency}ms LATENCY</span>
            </div>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalContainerRef}
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 max-h-[380px] overflow-y-auto space-y-3 font-mono cursor-text"
          style={{ scrollBehavior: 'smooth' }}
        >
          {history.map((line) => (
            <div key={line.id} className="leading-relaxed">
              {line.type === 'input' ? (
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                  <span className="text-slate-400 select-none">➜</span>
                  <span>{line.content}</span>
                </div>
              ) : (
                <div className="text-slate-300 text-xs">{line.content}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 text-xs pt-1">
            <span className="text-emerald-400 select-none font-bold">➜</span>
            <span className="text-cyan-400 select-none font-bold">~</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                AudioEngine.playKey();
              }}
              placeholder="Type 'help', 'status', 'ping', 'sudo hire'..."
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-slate-400 focus:ring-0 p-0"
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>

        {/* Quick Protocol Action Chips */}
        <div className="px-4 py-3 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 tracking-wider mr-1">
              Protocols:
            </span>
            {PRESET_COMMANDS.map((item) => (
              <button
                key={item.cmd}
                type="button"
                onClick={() => executeCommand(item.cmd)}
                className="px-3 py-1.5 min-h-[36px] rounded-lg bg-slate-800/90 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-xs font-mono text-slate-200 hover:text-cyan-300 transition-all duration-150 inline-flex items-center gap-1 shadow-sm"
              >
                <span className="text-cyan-400 font-bold">$</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400 hidden md:block">
            <span>Press Enter ↵ to dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
