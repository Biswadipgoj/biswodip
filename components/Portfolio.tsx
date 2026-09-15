"use client";

import React, { useEffect, useState } from "react";
import IdeGutter from "./editorial/IdeGutter";
import HeroSection from "./editorial/HeroSection";
import AboutSection from "./editorial/AboutSection";
import WorkSection from "./editorial/WorkSection";
import VirtualComputerSection from "./editorial/VirtualComputerSection";
import SystemCraftSection from "./editorial/SystemCraftSection";
import FieldNotesSection from "./editorial/FieldNotesSection";
import JourneySection from "./editorial/JourneySection";
import InteractiveFooter from "./editorial/InteractiveFooter";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("sec-001");

  useEffect(() => {
    const sectionIds = [
      "sec-001",
      "sec-002",
      "sec-003",
      "sec-004",
      "sec-005",
      "sec-006",
      "sec-007",
      "sec-008",
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)] relative selection:bg-[var(--accent)] selection:text-white">
      {/* Skip link for keyboard accessibility */}
      <a href="#sec-001" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent Desktop IDE Gutter Rail (001 - 008) */}
      <IdeGutter activeSection={activeSection} />

      {/* Main Expansive Site Content */}
      <main id="main" className="site-main">
        {/* 001: Hero with CS Topology Graph */}
        <HeroSection />

        {/* 002: About & CPU Instruction Pipeline */}
        <AboutSection />

        {/* 003: Production Systems & Contribution Mosaic Reveal */}
        <WorkSection />

        {/* 004: Living 3D Computer Workspace (Automata / Terminal / Memory) */}
        <VirtualComputerSection />

        {/* 005: CS Architecture & CPU Cache Hierarchy */}
        <SystemCraftSection />

        {/* 006: 3D Orbit Carousel of Field Notes */}
        <FieldNotesSection />

        {/* 007: Education & Engineering Timeline */}
        <JourneySection />

        {/* 008: Supercharged Interactive Footer (Physics Gravity Box & Packet Tracer) */}
        <InteractiveFooter />
      </main>
    </div>
  );
}
