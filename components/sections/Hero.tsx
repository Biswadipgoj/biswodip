'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { personal } from '@/lib/data';
import { useExperience } from '../ExperienceProvider';
import Icon from '../ui/Icon';
import Sticker from '../ui/Sticker';

import Computer3D from '../ui/Computer3D';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Syntax-highlighted source shown in the editor pane. */
const CODE: Array<Array<[string, string]>> = [
  [['tok-key', 'export default async function'], ['tok-punc', ' '], ['tok-fn', 'ship'], ['tok-punc', '() {']],
  [['tok-punc', '  '], ['tok-key', 'const'], ['tok-punc', ' '], ['tok-var', 'idea'], ['tok-punc', ' = '], ['tok-key', 'await'], ['tok-punc', ' '], ['tok-fn', 'understand'], ['tok-punc', '(']],
  [['tok-punc', '    '], ['tok-str', "'the business problem'"], ['tok-punc', ',']],
  [['tok-punc', '  );']],
  [['tok-com', '  // design → build → deploy']],
  [['tok-punc', '  '], ['tok-key', 'const'], ['tok-punc', ' '], ['tok-var', 'product'], ['tok-punc', ' = '], ['tok-fn', 'build'], ['tok-punc', '('], ['tok-var', 'idea'], ['tok-punc', ', { ']],
  [['tok-punc', '    typed'], ['tok-punc', ': '], ['tok-num', 'true'], ['tok-punc', ', tested'], ['tok-punc', ': '], ['tok-num', 'true'], ['tok-punc', ',']],
  [['tok-punc', '  });']],
  [['tok-punc', '  '], ['tok-key', 'return'], ['tok-punc', ' '], ['tok-fn', 'deploy'], ['tok-punc', '('], ['tok-var', 'product'], ['tok-punc', ');']],
  [['tok-punc', '}']],
];

const TERMINAL = [
  { text: '$ npm run deploy', cls: '' },
  { text: '✓ typecheck   0 errors', cls: 'term-ok' },
  { text: '✓ tests       passing', cls: 'term-ok' },
  { text: '✓ build       optimized', cls: 'term-ok' },
  { text: '→ shipping to production…', cls: 'term-hi' },
  { text: '✓ live · used in the wild', cls: 'term-ok' },
];

const MODULES = [
  { name: 'interface', width: '92%', color: '#7c3aed' },
  { name: 'services', width: '78%', color: '#0f766e' },
  { name: 'data', width: '64%', color: '#9d174d' },
  { name: 'delivery', width: '85%', color: '#1d4ed8' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { margin: '0px 0px -20% 0px' });
  const { animated, spatial } = useExperience();
  const [lines, setLines] = useState(TERMINAL.length);
  const [stageMode, setStageMode] = useState<'3d' | 'code'>('3d');

  // Stream the terminal log while the hero is visible.
  useEffect(() => {
    if (!animated || !inView) {
      setLines(TERMINAL.length);
      return;
    }
    setLines(1);
    let n = 1;
    const timer = setInterval(() => {
      n += 1;
      setLines(n);
      if (n >= TERMINAL.length) clearInterval(timer);
    }, 450);
    return () => clearInterval(timer);
  }, [animated, inView, stageMode]);

  // Pointer parallax across the pane stack.
  useEffect(() => {
    const node = stack.current;
    if (!node) return;
    if (!spatial) {
      node.style.setProperty('--px', '0deg');
      node.style.setProperty('--py', '0deg');
      return;
    }
    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      node.style.setProperty('--px', `${px}deg`);
      node.style.setProperty('--py', `${py}deg`);
    };
    const move = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      px = ((event.clientX - box.left) / box.width - 0.5) * 11;
      py = (0.5 - (event.clientY - box.top) / box.height) * 9;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const reset = () => {
      px = 0;
      py = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    node.addEventListener('pointermove', move, { passive: true });
    node.addEventListener('pointerleave', reset);
    return () => {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', reset);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [spatial, stageMode]);

  const enter = (delay: number) =>
    animated
      ? { initial: { opacity: 0, y: 26, filter: 'blur(8px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0.85, delay, ease: EASE } }
      : {};

  const pane = (delay: number, from: { x?: number; y?: number }) =>
    animated
      ? { initial: { opacity: 0, y: from.y ?? 0, x: from.x ?? 0, scale: 0.96 }, animate: { opacity: 1, y: 0, x: 0, scale: 1 }, transition: { duration: 0.5, delay: delay * 0.4, ease: EASE } }
      : {};

  return (
    <section id="hero" ref={heroRef} className="hero section-shell spatial-stage">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.span className="hero-name" {...enter(0.05)}>{personal.name}</motion.span>
          <h1>
            <motion.span className="line" {...enter(0.14)}><span>Good ideas.</span></motion.span>
            <motion.span className="line" {...enter(0.24)}><span className="grad-text">Great software.</span></motion.span>
          </h1>
          <motion.p className="hero-description" {...enter(0.36)}>
            I&apos;m Biswodip — an independent developer who connects design, engineering
            and business thinking to build products from first idea to final deploy.
          </motion.p>
          <motion.div className="hero-meta" {...enter(0.46)}>
            <span className="hero-chip"><i className="status-dot" /> Available for work</span>
            <span className="hero-chip">TypeScript</span>
            <span className="hero-chip">Next.js</span>
            <span className="hero-chip">Systems &amp; APIs</span>
          </motion.div>
          <motion.div className="actions" {...enter(0.56)}>
            <a className="btn-primary" href="#projects">Explore the work <Icon name="arrowUpRight" /></a>
            <a className="text-link" href="#contact">Let&apos;s talk <Icon name="arrowUpRight" /></a>
          </motion.div>
        </div>

        {/* Hero Right Stage: 3D Computer Workstation / Code Stack */}
        <div className="relative w-full flex flex-col items-center">
          {/* Stage Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-2 z-20">
            <button
              type="button"
              onClick={() => setStageMode('3d')}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                stageMode === '3d'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ✦ Architecture Runtime
            </button>
            <button
              type="button"
              onClick={() => setStageMode('code')}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                stageMode === 'code'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {'// Source Architecture'}
            </button>
          </div>

          {stageMode === '3d' ? (
            <div className="w-full relative">
              <Computer3D />
              <div className="text-center mt-[-10px] text-xs font-mono text-cyan-400/80">
                <span>Interactive Systems Kernel · Hardware accelerated · Real-time telemetry</span>
              </div>
            </div>
          ) : (
            <div ref={stack} className="code-stack w-full max-w-[580px]" role="img" aria-label="A layered software workspace: a code editor compiling a deployment function, a terminal streaming a passing build and deploy log, and a module breakdown panel.">
              <svg className="flow-svg" viewBox="0 0 400 560" fill="none" aria-hidden="true" preserveAspectRatio="none">
                <path className="flow-path" d="M 70 210 C 70 300, 250 250, 250 330" />
                <path className="flow-pulse" d="M 70 210 C 70 300, 250 250, 250 330" />
                <path className="flow-path" d="M 300 120 C 300 190, 120 170, 120 232" />
                <path className="flow-pulse" style={{ animationDelay: '-1.7s' }} d="M 300 120 C 300 190, 120 170, 120 232" />
              </svg>

              <motion.div className="pane pane-graph" {...pane(0.5, { y: -26 })}>
                <div className="pane-head"><span>architecture.map</span><span>4 modules</span></div>
                <div className="graph-body">
                  {MODULES.map((module, i) => (
                    <div className="dep-node" key={module.name}>
                      <i style={{ background: module.color }} />
                      {module.name}
                      <span className="dep-bar">
                        <span style={{ width: module.width, animationDelay: `${0.9 + i * 0.14}s`, background: `linear-gradient(90deg, ${module.color}, var(--accent-2))` }} />
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="pane pane-editor" {...pane(0.3, { x: -30 })}>
                <div className="pane-head">
                  <span className="pane-dots"><i /><i /><i /></span>
                  <span>ship.ts</span>
                  <span>TypeScript</span>
                </div>
                <div className="code-body">
                  {CODE.map((line, i) => (
                    <motion.div
                      className="code-line"
                      key={i}
                      initial={animated ? { opacity: 0, x: -10 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.6 + i * 0.09, ease: EASE }}
                    >
                      <span className="code-num">{i + 1}</span>
                      <span>
                        {line.map(([cls, text], j) => <span className={cls} key={j}>{text}</span>)}
                        {i === CODE.length - 1 && <span className="caret" />}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="pane pane-terminal" {...pane(0.68, { x: 30, y: 22 })}>
                <div className="pane-head">
                  <span>zsh — deploy</span>
                  <span>{lines >= TERMINAL.length ? 'done' : 'running'}</span>
                </div>
                <div className="term-body">
                  {TERMINAL.slice(0, lines).map(line => (
                    <span className={`term-line ${line.cls}`} key={line.text}>{line.text}</span>
                  ))}
                </div>
              </motion.div>

              {/* Unique Glassmorphic Computer Science Software Telemetry Elements */}
              <motion.div
                className="absolute -right-3 top-48 z-10 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-cyan-400/40 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.25)] flex items-center gap-2 font-mono text-[0.68rem] text-cyan-300 pointer-events-none"
                {...pane(0.95, { y: 18 })}
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>AST_PARSER: ROOT → EMIT</span>
              </motion.div>

              <motion.div
                className="absolute -left-5 bottom-20 z-10 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-emerald-400/40 backdrop-blur-xl shadow-[0_0_25px_rgba(52,211,153,0.25)] flex items-center gap-2 font-mono text-[0.68rem] text-emerald-300 pointer-events-none"
                {...pane(1.05, { y: -14 })}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>MICROTASK_TICK: 0.08ms</span>
              </motion.div>

              <motion.div
                className="absolute left-1/3 -top-4 z-10 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-violet-400/40 backdrop-blur-xl shadow-[0_0_25px_rgba(139,92,246,0.25)] flex items-center gap-2 font-mono text-[0.68rem] text-violet-300 pointer-events-none"
                {...pane(1.15, { y: 14 })}
              >
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span>RAFT_QUORUM: 3/3 NODES</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <div className="hero-rail">
        <span>Design · Build · Deploy · Deliver</span>
        <a href="#about">A little context <Icon name="arrowDown" /></a>
      </div>
    </section>
  );
}
