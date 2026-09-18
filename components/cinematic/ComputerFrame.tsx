'use client';

import React from 'react';

interface ComputerFrameProps {
  title?: string;
  url?: string;
  statusBadge?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ComputerFrame({
  title = 'workstation://biswadip.in',
  url = 'https://biswadip.in',
  statusBadge = 'ONLINE 120 FPS',
  children,
  className = '',
}: ComputerFrameProps) {
  return (
    <div
      className={`relative w-full rounded-3xl border border-white/40 glass-panel shadow-[0_25px_70px_rgba(0,30,80,0.25),inset_0_1px_2px_rgba(255,255,255,0.5)] overflow-hidden transition-all duration-300 bg-white/[0.16] backdrop-blur-3xl ${className}`}
    >
      {/* Top Monitor Bezel Camera & Ambient Sensor Dot */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 border border-white/30 z-30 pointer-events-none shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
        <span className="w-1 h-1 rounded-full bg-white/40" />
      </div>

      {/* Realistic Screen Glare / Specular Reflection */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 35%, transparent 60%)',
        }}
      />

      {/* Computer Window Titlebar / Browser Address Strip */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.18] border-b border-white/25 shrink-0 z-10">
        {/* macOS Action Dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
          <span className="hidden md:inline-block mono text-[11px] text-white/90 font-semibold ml-2">
            {title}
          </span>
        </div>

        {/* Central URL Bar */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-xl bg-white/[0.2] border border-white/30 text-xs mono text-white max-w-sm truncate shadow-inner">
          <span className="text-[#10b981]">🔒</span>
          <span className="truncate">{url}</span>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="mono text-[10px] text-[#00d2ff] font-bold px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-300/40">
            {statusBadge}
          </span>
        </div>
      </div>

      {/* Computer Screen Content Body */}
      <div className="relative w-full overflow-hidden bg-white/[0.10] p-4 sm:p-8 z-10 backdrop-blur-2xl">
        {children}
      </div>

      {/* Bottom Monitor Base / Chin Strip */}
      <div className="h-5 bg-white/[0.14] border-t border-white/20 flex items-center justify-center shrink-0 z-10">
        <span className="mono text-[9px] text-white/70 tracking-widest uppercase font-semibold">
          LIQUID RETINA INTERFACE · BISWADIP GOJ
        </span>
      </div>
    </div>
  );
}
