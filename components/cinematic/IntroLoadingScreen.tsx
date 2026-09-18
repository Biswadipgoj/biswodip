'use client';

import { useEffect, useState } from 'react';

interface IntroLoadingScreenProps {
  onComplete: () => void;
}

const terminalLines = [
  { text: 'biswodip@runtime-engine:~$ ./boot-system.sh --target=production --cse-rigor', isCommand: true, delay: 100 },
  { text: '[KERNEL] Initializing Linux 6.8.0-cse-x86_64 architecture...', isCommand: false, delay: 500 },
  { text: '[MEMORY] Virtual address mapping: V8 Heap + Microtask queue initialized', isCommand: false, delay: 900 },
  { text: '[NETWORK] WebSocket frame router listening on wss://telepoint:443 [RFC 6455]', isCommand: false, delay: 1300 },
  { text: '[DATABASE] PostgreSQL connection pool active · B-Tree indices verified', isCommand: false, delay: 1700 },
  { text: '[CREDENTIALS] Biswodip Goj: B.Tech CSE (2024) + Diploma (2021) verified', isCommand: false, delay: 2100 },
  { text: '[STATUS] 15+ Shipped systems online · 0 fatal errors. Launching viewport...', isCommand: false, delay: 2500 },
];

export default function IntroLoadingScreen({ onComplete }: IntroLoadingScreenProps) {
  const [typedCommand, setTypedCommand] = useState('');
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const commandText = './boot-system.sh --target=production --cse-rigor';
    let charIndex = 0;

    // Phase 1: Real-time code typing simulation
    const typeInterval = setInterval(() => {
      if (charIndex <= commandText.length) {
        setTypedCommand(commandText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 28);

    // Phase 2: Linux system boot outputs printing sequentially
    const timeouts: NodeJS.Timeout[] = [];
    terminalLines.slice(1).forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.text]);
      }, line.delay);
      timeouts.push(t);
    });

    // Phase 3: Progress bar counter 0% -> 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 70);

    // Phase 4: Trigger zoom push-in and dissolve
    const endTimer = setTimeout(() => {
      setIsZoomingOut(true);
      setTimeout(() => {
        onComplete();
      }, 450);
    }, 2900);

    return () => {
      clearInterval(typeInterval);
      clearInterval(progressInterval);
      timeouts.forEach(clearTimeout);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsZoomingOut(true);
    setTimeout(() => {
      onComplete();
    }, 150);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 bg-[#0f1322] transition-all duration-500 ${
        isZoomingOut ? 'scale-125 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* Ambient Studio Lighting Behind the Fullscreen Monitor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/20 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full" />
      </div>

      {/* ── FULL SCREEN COMPUTER WORKSTATION MONITOR (LUMINOUS SPATIAL GLASS) ── */}
      <div className="relative w-full max-w-5xl h-[86vh] max-h-[750px] rounded-3xl border-[10px] sm:border-[14px] border-white/30 bg-[#1e2348]/95 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35),0_0_60px_rgba(0,210,255,0.3)] flex flex-col overflow-hidden z-10">
        {/* Top Monitor Bezel Camera & Ambient Sensor */}
        <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/20 border border-white/30 z-20 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
          <span className="w-1 h-1 rounded-full bg-white/50" />
        </div>

        {/* Realistic Glass Reflection Over Screen */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 60%)',
          }}
        />

        {/* ── TERMINAL WINDOW HEADER (macOS / Linux Style) ── */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.12] border-b border-white/[0.18] shrink-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#f43f5e] shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
            <span className="w-3 h-3 rounded-full bg-[#fbbf24] shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            <span className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
            <span className="mono text-xs text-white/90 font-medium ml-3">
              biswodip@runtime: ~ (zsh / linux-6.8.0)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block mono text-[11px] text-[#00d2ff] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 font-bold">
              CSE BOOT SEQUENCE
            </span>
            <button
              onClick={handleSkip}
              className="px-3 py-1 rounded-full bg-white/[0.15] hover:bg-white/[0.25] border border-white/[0.3] text-xs mono text-white font-semibold transition-colors"
            >
              Skip Intro ↗
            </button>
          </div>
        </div>

        {/* ── TERMINAL OUTPUT & TYPING SCREEN ── */}
        <div className="flex-1 p-5 sm:p-8 font-mono text-xs sm:text-sm text-white overflow-y-auto space-y-3 bg-[#161a38]/90 z-10">
          {/* Active typed command line */}
          <div className="flex items-center gap-2 text-white">
            <span className="text-[#00d2ff] font-bold">biswodip@cse-runtime:~$</span>
            <span className="text-[#38bdf8] font-semibold">{typedCommand}</span>
            <span className="w-2 h-4 bg-[#00d2ff] animate-pulse inline-block" />
          </div>

          {/* Sequential Linux outputs */}
          <div className="space-y-2 pt-2 text-[11px] sm:text-xs">
            {visibleLines.map((line, idx) => {
              const isSuccess = line.includes('OK') || line.includes('ACTIVE') || line.includes('VERIFIED');
              return (
                <div
                  key={idx}
                  className={`leading-relaxed transition-opacity duration-200 ${
                    isSuccess ? 'text-[#10b981] font-semibold' : 'text-[#cbd5e1]'
                  }`}
                >
                  {line}
                </div>
              );
            })}
          </div>

          {/* Execution Banner when loading reaches near end */}
          {visibleLines.length >= 4 && (
            <div className="p-3.5 rounded-xl bg-white/[0.1] border border-white/[0.2] mt-4 flex items-center justify-between text-xs">
              <span className="text-white font-medium">
                Runtime Ready: Initializing Portfolio UI Layers...
              </span>
              <span className="text-[#00d2ff] font-bold">{Math.min(progress, 100)}%</span>
            </div>
          )}
        </div>

        {/* ── BOTTOM MONITOR FOOTER STRIP ── */}
        <div className="px-5 py-3 bg-white/[0.1] border-t border-white/[0.18] flex items-center justify-between z-10 shrink-0 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
            <span className="mono text-[11px] text-[#94a3b8]">
              DISPLAY: 4K HIGH-DPI · 120 FPS THREE.JS · NEXT.JS 14
            </span>
          </div>

          {/* Mini progress track */}
          <div className="w-36 h-1.5 rounded-full bg-white/[0.1] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d2ff] via-[#818cf8] to-[#10b981] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Lower Chin Branding */}
        <div className="h-6 bg-[#181d2e] border-t border-black/40 flex items-center justify-center shrink-0 z-10">
          <span className="mono text-[9px] text-[#64748b] tracking-widest uppercase">
            BISWODIP GOJ · WORKSTATION DISPLAY
          </span>
        </div>
      </div>
    </div>
  );
}
