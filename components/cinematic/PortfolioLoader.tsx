'use client';

import { useState, useEffect } from 'react';

/**
 * 2-second Linux CLI initialization sequence on initial site visit.
 * Authentic terminal styling, respects prefers-reduced-motion, stores session visit flag,
 * and unmounts cleanly after 2 seconds.
 */
export default function PortfolioLoader() {
  const [stage, setStage] = useState<'prompt' | 'running' | 'ready' | 'handoff' | 'done'>('prompt');
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // In automated test environments (Playwright, etc.), bypass loader to avoid blocking test execution
    if (typeof navigator !== 'undefined' && navigator.webdriver) {
      setMounted(false);
      return;
    }

    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMounted(false);
      return;
    }

    // Run once per session
    try {
      const seen = sessionStorage.getItem('biswodip_cli_init');
      if (seen) {
        setMounted(false);
        return;
      }
      sessionStorage.setItem('biswodip_cli_init', '1');
    } catch {
      // Storage unavailable (e.g. strict privacy mode)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStage('done');
        setMounted(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // 2.0 second choreographed sequence
    const t1 = setTimeout(() => setStage('running'), 300);
    const t2 = setTimeout(() => setStage('ready'), 800);
    const t3 = setTimeout(() => setStage('handoff'), 1450);
    const t4 = setTimeout(() => {
      setStage('done');
      setMounted(false);
    }, 2000);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (!mounted || stage === 'done') return null;

  return (
    <div
      className={`cli-loader-overlay ${stage === 'handoff' ? 'cli-handoff' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Initializing developer workstation environment"
    >
      <div className="cli-terminal-window">
        <div className="cli-window-header">
          <div className="cli-window-buttons" aria-hidden="true">
            <span className="cli-btn cli-btn-close" />
            <span className="cli-btn cli-btn-min" />
            <span className="cli-btn cli-btn-max" />
          </div>
          <span className="cli-window-title">biswadip@station: ~</span>
          <div className="cli-header-right">
            <span className="cli-window-meta">bash 5.2 · x86_64</span>
            <button
              type="button"
              className="cli-skip-btn"
              onClick={() => {
                setStage('done');
                setMounted(false);
              }}
              aria-label="Skip initialization"
            >
              Skip [ESC]
            </button>
          </div>
        </div>

        <div className="cli-window-body">
          <div className="cli-line cli-prompt-line">
            <span className="cli-user">biswadip@station</span>
            <span className="cli-sep">:</span>
            <span className="cli-path">~</span>
            <span className="cli-symbol">$</span>
            <span className="cli-cmd">./sys_init --mode=production</span>
          </div>

          {(stage === 'running' || stage === 'ready' || stage === 'handoff') && (
            <div className="cli-output">
              <div className="cli-log">
                <span className="cli-tag">[  OK  ]</span> Initialized Linux workstation runtime (x86_64)
              </div>
              <div className="cli-log">
                <span className="cli-tag">[  OK  ]</span> Verified 60+ software products &amp; systems
              </div>
              <div className="cli-log">
                <span className="cli-tag">[  OK  ]</span> Mounted production architectures &amp; source trees
              </div>
              <div className="cli-log">
                <span className="cli-tag">[  OK  ]</span> Initialized Next.js 15 App Router &amp; spatial UI
              </div>
            </div>
          )}

          {(stage === 'ready' || stage === 'handoff') && (
            <div className="cli-status-grid">
              <div className="cli-status-item">
                <span>runtime_kernel</span>
                <span className="cli-dots">................</span>
                <span className="cli-ready-badge">ready</span>
              </div>
              <div className="cli-status-item">
                <span>catalog_60plus</span>
                <span className="cli-dots">................</span>
                <span className="cli-ready-badge">ready</span>
              </div>
              <div className="cli-status-item">
                <span>spatial_workspace</span>
                <span className="cli-dots">.............</span>
                <span className="cli-ready-badge">ready</span>
              </div>
            </div>
          )}

          <div className="cli-cursor-line">
            <span className="cli-symbol">&gt;</span>
            <span className="cli-handoff-text">
              {stage === 'ready' || stage === 'handoff' ? 'launching interactive engineering journey...' : 'executing boot tasks...'}
            </span>
            <span className="cli-cursor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
