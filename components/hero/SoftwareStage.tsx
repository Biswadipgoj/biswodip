'use client';

import { useEffect, useRef, useState } from 'react';
import { useExperience } from '../ExperienceProvider';
import Icon from '../ui/Icon';

/* --------------------------------------------------------------------------
   Authored sample sources.
   These are illustrative code/log surfaces for the stage — they describe the
   real stack in lib/data.ts (Next.js, TypeScript, React) and carry no invented
   portfolio metrics.
   -------------------------------------------------------------------------- */

type Tok = 'plain' | 'key' | 'str' | 'fn' | 'type' | 'com' | 'attr';

const CODE: [Tok, string][][] = [
  [['com', '// code → test → build → deploy']],
  [['key', 'type'], ['plain', ' '], ['type', 'Stage'], ['plain', ' =']],
  [['plain', "  | "], ['str', "'code'"], ['plain', ' | '], ['str', "'test'"]],
  [['plain', "  | "], ['str', "'build'"], ['plain', ' | '], ['str', "'deploy'"], ['plain', ';']],
  [],
  [['key', 'export function'], ['plain', ' '], ['fn', 'usePipeline'], ['plain', '('], ['attr', 'stage'], ['plain', ': '], ['type', 'Stage'], ['plain', ') {']],
  [['plain', '  const ['], ['type', 'current'], ['plain', ', '], ['type', 'setCurrent'], ['plain', '] =']],
  [['plain', '    '], ['fn', 'useState'], ['plain', '<'], ['type', 'Stage'], ['plain', '>('], ['attr', 'stage'], ['plain', ');']],
  [],
  [['plain', '  const '], ['fn', 'next'], ['plain', ' = '], ['fn', 'useCallback'], ['plain', '(() => {']],
  [['plain', '    '], ['fn', 'setCurrent'], ['plain', '('], ['fn', 'advance'], ['plain', '('], ['type', 'STAGES'], ['plain', ', '], ['type', 'current'], ['plain', '));']],
  [['plain', '  }, ['], ['type', 'current'], ['plain', ']);']],
  [],
  [['plain', '  return { '], ['type', 'current'], ['plain', ', '], ['fn', 'next'], ['plain', ' };']],
  [['plain', '}']],
];

const LOG: { tone: 'plain' | 'ok' | 'dim' | 'cy'; text: string }[] = [
  { tone: 'dim', text: '$ npm run build' },
  { tone: 'cy', text: '▲ Next.js 14 — production build' },
  { tone: 'plain', text: '✓ Compiled client and server' },
  { tone: 'plain', text: '✓ Type check passed' },
  { tone: 'ok', text: '✓ Route /project/[slug] prerendered' },
  { tone: 'ok', text: '✓ Deployed to the edge' },
];

const RESPONSE: [string, string][] = [
  ['status', "'200 OK'"],
  ['route', "'/api/pipeline'"],
  ['stage', "'deploy'"],
  ['ready', 'true'],
];

const TREE = ['usePipeline()', '├─ stage: Stage', '├─ next()', '└─ STAGES[4]'];

const FEED = ['shipped', 'typed', 'tested', 'deployed'];

/* -------------------------------------------------------------------------- */

export default function SoftwareStage() {
  const { animated, spatial } = useExperience();
  const frame = useRef(0);

  /* Pointer parallax — rAF-throttled, written to CSS custom properties so the
     compositor handles it and React never re-renders on mouse move. */
  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!spatial || frame.current) return;
    const target = event.currentTarget;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const box = target.getBoundingClientRect();
      const x = (clientX - box.left) / box.width - 0.5;
      const y = (clientY - box.top) / box.height - 0.5;
      target.style.setProperty('--pointer-rx', `${(x * 11).toFixed(2)}deg`);
      target.style.setProperty('--pointer-ry', `${(-y * 9).toFixed(2)}deg`);
    });
  }
  function resetPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (frame.current) { cancelAnimationFrame(frame.current); frame.current = 0; }
    event.currentTarget.style.setProperty('--pointer-rx', '0deg');
    event.currentTarget.style.setProperty('--pointer-ry', '0deg');
  }
  useEffect(() => () => { if (frame.current) cancelAnimationFrame(frame.current); }, []);

  /* The terminal streams its log a line at a time, then loops. With motion off
     the full log is simply shown. */
  const [shown, setShown] = useState(LOG.length);
  useEffect(() => {
    if (!animated) { setShown(LOG.length); return; }
    setShown(2);
    const timer = window.setInterval(() => {
      setShown(count => (count >= LOG.length ? 2 : count + 1));
    }, 1100);
    return () => window.clearInterval(timer);
  }, [animated]);

  const progress = Math.round((shown / LOG.length) * 100);

  return (
    <div className="software-stage" onPointerMove={onPointerMove} onPointerLeave={resetPointer}>
      <div className="stage-chrome">
        <div className="stage-bar">
          <span>
            <span className="stage-dots" aria-hidden="true">●●●</span>
            <span>biswodip / workspace</span>
          </span>
          <span>main · TypeScript</span>
        </div>

        <div className="pane-stage">
          <div className="pane-field">
            {/* data-flow routes between the panes */}
            <svg className="pane-flow" viewBox="0 0 634 560" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#8fe6ff" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path className="flow-line" vectorEffect="non-scaling-stroke" d="M406,170 C412,140 418,105 425,70" />
              <path className="flow-line" vectorEffect="non-scaling-stroke" d="M406,310 C360,348 312,382 266,400" />
              <path className="flow-line" vectorEffect="non-scaling-stroke" d="M526,137 C528,148 530,158 532,170" />
              <path className="flow-line" vectorEffect="non-scaling-stroke" d="M532,286 C512,308 478,336 444,358" />
            </svg>
            <span className="flow-particle" style={{ left: '64%', top: '30.4%', '--tx': '19px', '--ty': '-100px' } as React.CSSProperties} aria-hidden="true" />
            <span className="flow-particle p2" style={{ left: '64%', top: '55.4%', '--tx': '-140px', '--ty': '90px' } as React.CSSProperties} aria-hidden="true" />
            <span className="flow-particle p3" style={{ left: '83%', top: '51.1%', '--tx': '-88px', '--ty': '72px' } as React.CSSProperties} aria-hidden="true" />

            {/* 1 — the editor */}
            <div className="pane pane-editor">
              <div className="pane-bar">
                <span><b>usePipeline.ts</b></span>
                <span>pipeline / hooks</span>
              </div>
              <pre className="code-block" aria-hidden="true">
                {CODE.map((line, index) => (
                  <span className="code-line" key={index} style={{ '--d': `${0.12 + index * 0.05}s` } as React.CSSProperties}>
                    <span className="ln">{String(index + 1).padStart(2, ' ')}</span>
                    <span className="cd">
                      {line.length === 0
                        ? ' '
                        : line.map(([token, value], i) => (
                            <span key={i} className={`tok-${token}`}>{value}</span>
                          ))}
                    </span>
                  </span>
                ))}
              </pre>
            </div>

            {/* 2 — the API response */}
            <div className="pane pane-response">
              <div className="pane-bar">
                <span><b>GET</b> response</span>
                <span>JSON</span>
              </div>
              <div className="resp-block" aria-hidden="true">
                <div>{'{'}</div>
                {RESPONSE.map(([key, value]) => (
                  <div key={key}>&nbsp;&nbsp;<span className="k">&quot;{key}&quot;</span>: <span className={value === 'true' ? 'n' : 's'}>{value}</span>,</div>
                ))}
                <div>{'}'}</div>
              </div>
            </div>

            {/* 3 — the component tree */}
            <div className="pane pane-tree">
              <div className="pane-bar"><span><b>Component tree</b></span></div>
              <div className="tree-block" aria-hidden="true">
                {TREE.map((row) => (
                  <span className="tree-row" key={row}>
                    <i className="tree-chip" />
                    <span className={row.startsWith('├') || row.startsWith('└') ? 'tree-branch' : ''}>{row}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4 — the terminal */}
            <div className="pane pane-term">
              <div className="pane-bar">
                <span><b>terminal</b></span>
                <span>deploy</span>
              </div>
              <div className="term-block" aria-hidden="true">
                {LOG.map((line, index) => (
                  <div
                    className="term-line"
                    key={line.text}
                    style={{
                      opacity: index < shown ? 1 : 0,
                      transition: 'opacity .45s var(--ease-premium)',
                    }}
                  >
                    <span className={line.tone === 'plain' ? undefined : line.tone}>{line.text}</span>
                  </div>
                ))}
                <div className="term-line"><span className="dim">$</span><span className="term-caret" /></div>
              </div>
              <div className="pipeline-progress" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="stage-foot">
          <span><i className="status-dot" />Software that ships end to end.</span>
          <span className="stage-pipeline">
            {FEED.map((stage, index) => (
              <span className="pipe-stage" key={stage} style={{ '--d': `${index * 1.15}s` } as React.CSSProperties}>{stage}</span>
            ))}
          </span>
        </div>
      </div>

      <a className="text-link stage-cta" href="#projects">
        See what I built with it <Icon name="arrowUpRight" />
      </a>
    </div>
  );
}
