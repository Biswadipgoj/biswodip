'use client';

import { useState } from 'react';
import SmoothScroll from './SmoothScroll';
import CompileNav from './CompileNav';
import IntroLoadingScreen from './cinematic/IntroLoadingScreen';
import MasterComputerChassis from './cinematic/MasterComputerChassis';
import CinematicHero from './cinematic/CinematicHero';
import AboutSection from './cinematic/AboutSection';
import SystemStackSection from './cinematic/SystemStackSection';
import TelePointExperience from './cinematic/TelePointExperience';
import NanoLinkExperience from './cinematic/NanoLinkExperience';
import ProjectShowcase from './cinematic/ProjectShowcase';
import EngineeringProcess from './cinematic/EngineeringProcess';
import BoldStatementStats from './cinematic/BoldStatementStats';
import JourneyTimeline from './cinematic/JourneyTimeline';
import ContactFinalPhoto from './cinematic/ContactFinalPhoto';
import { personal } from '@/lib/data';

export default function CompilePortfolio() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* ── 00: CINEMATIC 3D COMPUTER LOADING INTRO (2.5 - 3.5s) ── */}
      {showIntro && (
        <IntroLoadingScreen onComplete={() => setShowIntro(false)} />
      )}

      <SmoothScroll>
        {/* Skip Link */}
        <a className="skip-link" href="#work">
          Skip to Systems
        </a>

        {/* Persistent Floating Navigation HUD */}
        <CompileNav />

        {/* ── LUMINOUS MULTICOLOR SPATIAL GRADIENT CANVAS & FLOATING ORBS ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden spatial-glass-canvas">
          {/* Architectural circuit grid */}
          <div className="absolute inset-0 opacity-20 circuit-grid pointer-events-none" />

          {/* Floating Animated Ambient Orb 1: Lighter Electric Azure Sky */}
          <div
            className="absolute -top-24 left-1/4 w-[850px] h-[850px] rounded-full blur-[100px] opacity-85 ambient-orb-1 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #38bdf8 0%, rgba(14, 165, 233, 0.8) 45%, rgba(59, 130, 246, 0.45) 75%, transparent 95%)',
            }}
          />

          {/* Floating Animated Ambient Orb 2: Lighter Radiant Amethyst / Lavender */}
          <div
            className="absolute top-1/4 -right-24 w-[800px] h-[800px] rounded-full blur-[110px] opacity-85 ambient-orb-2 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #c084fc 0%, rgba(168, 85, 247, 0.8) 45%, rgba(147, 51, 234, 0.45) 75%, transparent 95%)',
            }}
          />

          {/* Floating Animated Ambient Orb 3: Lighter Sunset Rose / Coral */}
          <div
            className="absolute top-1/2 -left-28 w-[800px] h-[800px] rounded-full blur-[100px] opacity-80 ambient-orb-3 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #fb7185 0%, rgba(244, 63, 94, 0.75) 45%, rgba(225, 29, 72, 0.4) 75%, transparent 95%)',
            }}
          />

          {/* Floating Animated Ambient Orb 4: Lighter Emerald / Mint Glow */}
          <div
            className="absolute top-3/4 right-1/6 w-[750px] h-[750px] rounded-full blur-[100px] opacity-80 ambient-orb-1 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #34d399 0%, rgba(16, 185, 129, 0.75) 45%, rgba(5, 150, 105, 0.4) 75%, transparent 95%)',
            }}
          />

          {/* Floating Animated Ambient Orb 5: Lighter Warm Amber / Peach Glow */}
          <div
            className="absolute -bottom-24 left-1/3 w-[700px] h-[700px] rounded-full blur-[110px] opacity-75 ambient-orb-2 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #fcd34d 0%, rgba(251, 146, 60, 0.75) 45%, rgba(244, 63, 94, 0.4) 75%, transparent 95%)',
            }}
          />
        </div>

        {/* ── MASTER COMPUTER CHASSIS WRAPPING THE ENTIRE WEBPAGE ── */}
        <div className="relative w-full z-20">
          <MasterComputerChassis>
            <main className="relative w-full">
              {/* 01: Hero with 3D Computer Workstation */}
              <CinematicHero />

              {/* 02: About — Academic Foundation & Systems Philosophy */}
              <AboutSection />

              {/* 03: System Stack — Scroll-Driven 3D Zoom Workbench */}
              <SystemStackSection />

              {/* 04: TelePoint — Sub-42ms Real-Time Communication */}
              <TelePointExperience />

              {/* 05: NanoLink — URL Shortener & Analytics */}
              <NanoLinkExperience />

              {/* 06: Shipped Systems — Erpixa, Nexora, Tripmate */}
              <ProjectShowcase />

              {/* 07: Engineering Process Lifecycle */}
              <EngineeringProcess />

              {/* 08: Bold Statement & Interactive CSE Objects Stats */}
              <BoldStatementStats />

              {/* 09: Truthful Journey & Academic Degree (No stock images) */}
              <JourneyTimeline />

              {/* 10: Human Return & Contact */}
              <ContactFinalPhoto />
            </main>

            {/* Computer Frame Embedded Footer */}
            <footer className="relative w-full py-10 px-6 text-center border-t border-white/[0.18] bg-white/[0.1] backdrop-blur-xl">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#e2e8f0]">
                <div>
                  © {new Date().getFullYear()} {personal.name} · Full-Stack Software Systems Engineer
                </div>
                <div className="mono text-[11px] text-[#00d2ff] font-bold">
                  APPLE PRO DISPLAY CHASSIS · SCROLL PROGRESS ENGINE (0% - 100%) · 120 FPS
                </div>
              </div>
            </footer>
          </MasterComputerChassis>
        </div>
      </SmoothScroll>
    </>
  );
}
