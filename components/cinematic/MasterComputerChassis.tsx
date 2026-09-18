'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface MasterComputerChassisProps {
  children: React.ReactNode;
}

export default function MasterComputerChassis({ children }: MasterComputerChassisProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSectionName, setActiveSectionName] = useState<string>('01 // HERO');
  const [timeStr, setTimeStr] = useState<string>('00:00 IST');

  useEffect(() => {
    // Update local time
    const updateTime = () => {
      try {
        const now = new Date();
        const ist = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setTimeStr(`${ist} IST`);
      } catch {
        setTimeStr('23:45 IST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;
      setScrollProgress(progress);

      // Section tracking for header
      const sections = [
        { id: 'home', label: '01 // HERO' },
        { id: 'about', label: '02 // FOUNDATION' },
        { id: 'stack', label: '03 // ARCHITECTURE & ZOOM' },
        { id: 'telepoint', label: '04 // TELEPOINT REAL-TIME' },
        { id: 'nanolink', label: '05 // NANOLINK ENGINE' },
        { id: 'work', label: '06 // SHIPPED FLEET' },
        { id: 'process', label: '07 // ENGINEERING LIFECYCLE' },
        { id: 'rigor', label: '08 // RIGOR & STATS' },
        { id: 'journey', label: '09 // CSE ACADEMIC DEGREE' },
        { id: 'contact', label: '10 // CONNECT' },
      ];

      const scrollPos = scrollTop + 260;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSectionName(s.label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen p-2 sm:p-4 lg:p-6 xl:p-8 transition-all duration-500">
      {/* ── MASTER APPLE COMPUTER CHASSIS (Double-Bezel Architecture) ── */}
      <div className="relative w-full mx-auto rounded-[2rem] sm:rounded-[2.75rem] border border-white/40 shadow-[0_30px_100px_rgba(0,30,80,0.28),inset_0_1px_2px_rgba(255,255,255,0.6)] backdrop-blur-3xl bg-white/[0.12] overflow-hidden">
        {/* Top Hardware Center Stage Notch with Camera & Privacy LED */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 z-50 pointer-events-none shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="mono text-[9px] font-bold text-white/80 tracking-wider">RETINA DISPLAY</span>
        </div>

        {/* ── macOS PRO STUDIO CHROME HEADER ── */}
        <header className="sticky top-0 z-40 w-full bg-white/[0.18] backdrop-blur-2xl border-b border-white/30 px-3 sm:px-6 py-2.5 sm:py-3 transition-all">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Window Action Dots & Brand Badge */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]" />
              </div>

              {/* Biswodip Engineer Avatar Pill */}
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/25">
                <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-white/50 shrink-0">
                  <Image
                    src="/biswodip.png"
                    alt="Biswodip Goj"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-tight font-display">Biswodip Goj</span>
                  <span className="mono text-[9px] text-[#00d2ff] leading-none">B.Tech CSE · 2024</span>
                </div>
              </div>
            </div>

            {/* Center: Apple-style Unified URL & Section Indicator Pill */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/[0.18] border border-white/30 text-xs shadow-inner max-w-xs sm:max-w-md truncate">
              <span className="text-[#10b981] text-xs">🔒</span>
              <span className="mono text-[11px] sm:text-xs text-white font-medium truncate">https://biswadip.in</span>
              <span className="hidden md:inline-block text-white/40">/</span>
              <span className="hidden md:inline-block mono text-[10px] text-[#00d2ff] font-bold truncate">
                {activeSectionName}
              </span>
            </div>

            {/* Right: Real-Time 0% to 100% Scroll Progress Counter & System Telemetry */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Live Scroll Progress Pill */}
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border border-cyan-300/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-ping" />
                <span className="mono text-[10px] sm:text-xs font-bold text-white">
                  SCROLL: {scrollProgress}%
                </span>
              </div>

              {/* Live Clock / Telemetry */}
              <div className="hidden lg:flex items-center gap-2 mono text-[10px] text-white/80 border-l border-white/20 pl-2">
                <span>{timeStr}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#10b981] font-bold border border-emerald-400/30">
                  120 FPS
                </span>
              </div>
            </div>
          </div>

          {/* Continuous Animated 0% to 100% Scroll Progress Bar Strip */}
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d2ff] via-[#a855f7] to-[#10b981] transition-all duration-150 ease-out shadow-[0_0_8px_#00d2ff]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </header>

        {/* ── INNER LIQUID RETINA DISPLAY SURFACE ── */}
        <div className="relative w-full overflow-hidden">
          {children}
        </div>

        {/* ── COMPUTER BASE BEZEL CHIN STRIP ── */}
        <footer className="h-6 sm:h-8 bg-white/[0.14] border-t border-white/25 flex items-center justify-between px-4 sm:px-8 text-[9px] sm:text-[10px] mono text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>BISWODIP.IN · RETINA DISPLAY CHASSIS v2.4</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>HARDWARE COMPOSITING: WEBGPU / THREE.JS</span>
            <span className="text-[#00d2ff] font-bold">SCROLL ENGINE ACTIVE (0% - 100%)</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
