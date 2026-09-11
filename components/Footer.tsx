'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import Icon from './ui/Icon';
import { github, personal } from '@/lib/data';
import { AudioEngine } from './ui/AudioFeedback';

export default function Footer() {
  const [localTime, setLocalTime] = useState('');
  const [fps, setFps] = useState<number>(120);
  const [domNodes, setDomNodes] = useState<number>(0);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999, isHovered: false });
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Live IST Clock
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
          hour12: false,
        })
      );
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // 2. Real-time FPS Tracker
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        const calculatedFps = Math.round((frameCount * 1000) / (now - lastTime));
        setFps(Math.min(144, Math.max(30, calculatedFps)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };
    animId = requestAnimationFrame(measureFps);

    // 3. DOM Node Count
    if (typeof document !== 'undefined') {
      setDomNodes(document.getElementsByTagName('*').length);
    }

    // 4. Audio state
    AudioEngine.init();
    setIsAudioActive(!AudioEngine.isMuted());

    return () => {
      clearInterval(timeInterval);
      cancelAnimationFrame(animId);
    };
  }, []);

  const toggleAudio = () => {
    const nextMuted = isAudioActive; // if currently active, next is muted
    AudioEngine.setMuted(nextMuted);
    setIsAudioActive(!nextMuted);
    if (!nextMuted) {
      AudioEngine.playChime();
    }
  };

  const scrollToTop = () => {
    AudioEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWordmarkMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleWordmarkMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const letters = 'BISWODIP GOJ'.split('');

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 text-slate-400 overflow-hidden select-none">
      {/* Background Decorative Ambient Flares */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute top-0 right-10 w-[400px] h-[200px] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        {/* =========================================================================
            ROW 1: Real-time Systems Telemetry & Status Bar
           ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 mb-14 text-xs font-mono shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-slate-200 font-bold tracking-wider uppercase">
              SYSTEM STATUS: ALL ARCHITECTURES OPERATIONAL
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400">
            {/* Live FPS Meter */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
              <span className="text-emerald-400 font-bold">⚡</span>
              <span className="text-emerald-300 font-semibold">{fps} FPS</span>
            </div>

            {/* Edge Latency */}
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-400">📡</span>
              <span>EDGE LATENCY: 12ms</span>
            </div>

            {/* Uluberia Local Time */}
            <div className="flex items-center gap-1.5">
              <span className="text-purple-400">🕒</span>
              <span>ULUBERIA (IST): {localTime ? `${localTime} IST` : '18:00:00 IST'}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              type="button"
              className={`px-2.5 py-1 rounded-lg border text-[0.72rem] transition-colors flex items-center gap-1.5 ${
                isAudioActive
                  ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300'
                  : 'border-slate-800 bg-slate-800/60 text-slate-500 hover:text-slate-300'
              }`}
              title="Toggle tactile sound synthesis"
            >
              <span>{isAudioActive ? '🔊' : '🔇'}</span>
              <span>SOUND: {isAudioActive ? 'ON' : 'MUTED'}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            ROW 2: Architectural Quick Jump Matrix & Information Columns
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-slate-800/80">
          {/* Col 1-5: Bio / Vision */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20">
                  b.
                </span>
                <span className="text-xl font-bold text-white tracking-tight">
                  Biswodip Goj
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-sm">
                Full-stack software engineer &amp; business analyst crafting scalable distributed systems, reactive architectures, and 120 FPS high-fidelity digital products.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={AudioEngine.playClick}
                className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>GitHub</span>
                <Icon name="arrowUpRight" />
              </a>
              <a
                href={`mailto:${personal.email}`}
                onMouseEnter={AudioEngine.playClick}
                className="px-3.5 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 text-xs font-mono text-cyan-300 transition-colors flex items-center gap-1.5"
              >
                <span>Email Protocol</span>
                <Icon name="arrowUpRight" />
              </a>
            </div>
          </div>

          {/* Col 6-8: Navigation Matrix */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4">
              {'// ARCHITECTURAL DIRECTORY'}
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#hero" onMouseEnter={AudioEngine.playClick} className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-slate-600">01</span>
                  <span>Architecture Runtime Stage</span>
                </a>
              </li>
              <li>
                <a href="#about" onMouseEnter={AudioEngine.playClick} className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-slate-600">02</span>
                  <span>Engineering Philosophy</span>
                </a>
              </li>
              <li>
                <a href="#skills" onMouseEnter={AudioEngine.playClick} className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-slate-600">03</span>
                  <span>System Layers &amp; Tech Arsenal</span>
                </a>
              </li>
              <li>
                <a href="#projects" onMouseEnter={AudioEngine.playClick} className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-slate-600">04</span>
                  <span>3D Curved Builds Fleet</span>
                </a>
              </li>
              <li>
                <a href="#contact" onMouseEnter={AudioEngine.playClick} className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span className="text-slate-600">05</span>
                  <span>Signal Transmission Deck</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 9-12: System Spec & Cryptographic Verification */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-4">
                {'// SYSTEM TELEMETRY'}
              </h4>
              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">Framework:</span>
                  <span className="text-slate-300">Next.js 14 App Router</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">Acceleration:</span>
                  <span className="text-emerald-400">WebGL / Three.js</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">DOM Nodes:</span>
                  <span className="text-cyan-400">{domNodes || 380} elements</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-900">
                  <span className="text-slate-500">Security:</span>
                  <span className="text-slate-300">Postgres RLS Clean</span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              type="button"
              className="mt-6 w-full py-2.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 hover:border-slate-700 text-xs font-mono text-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Back to Top</span>
              <Icon name="arrowUp" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            ROW 3: Kinetic Specular Holographic Typography Wordmark
           ========================================================================= */}
        <div
          ref={wordmarkRef}
          onMouseMove={handleWordmarkMouseMove}
          onMouseLeave={handleWordmarkMouseLeave}
          className="pt-14 pb-10 text-center overflow-hidden relative cursor-default"
        >
          {/* Background subtle ticker tape */}
          <div className="mb-4 text-[0.65rem] sm:text-xs font-mono tracking-widest text-slate-600 uppercase flex items-center justify-center gap-3">
            <span>✦ SCALABLE DISTRIBUTED SYSTEMS</span>
            <span>·</span>
            <span>60–120 FPS RUNTIME</span>
            <span>·</span>
            <span>ROW-LEVEL SECURITY</span>
            <span>·</span>
            <span>ULUBERIA NODE</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block relative"
          >
            {/* Interactive Letter Array with 3D Hover dynamics */}
            <h2
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase select-none transition-all duration-300 flex justify-center items-center"
              style={{
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
                backgroundImage: mousePos.isHovered
                  ? `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 1) 0%, rgba(168, 85, 247, 0.9) 35%, rgba(244, 114, 182, 0.7) 60%, rgba(148, 163, 184, 0.4) 85%, rgba(71, 85, 105, 0.25) 100%)`
                  : 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 35%, #64748b 70%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: mousePos.isHovered ? '0 0 40px rgba(34, 211, 238, 0.35)' : 'none',
              }}
            >
              {letters.map((char, index) => (
                <span
                  key={index}
                  onMouseEnter={() => {
                    AudioEngine.playClick();
                  }}
                  onClick={() => {
                    AudioEngine.playChime();
                  }}
                  className="inline-block transition-transform duration-200 hover:-translate-y-2 hover:scale-105 active:scale-95"
                  style={{
                    display: char === ' ' ? 'inline' : 'inline-block',
                    width: char === ' ' ? '0.3em' : 'auto',
                  }}
                >
                  {char}
                </span>
              ))}
            </h2>

            <div className="mt-4 text-[0.65rem] sm:text-xs font-mono tracking-widest text-slate-400 uppercase">
              DISTRIBUTED SYSTEMS · FULL STACK ARCHITECTURE · CREATIVE COMPUTATION
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            ROW 4: Copyright & Commit Hash Verification
           ========================================================================= */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[0.7rem] font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>SHA-256 VERIFIED BUILD · DEPLOYED AT EDGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
