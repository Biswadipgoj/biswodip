'use client';

import React from 'react';

interface AcademicMilestone {
  date: string;
  title: string;
  subtitle: string;
  institution: string;
  badge: string;
  accentColor: string;
  badgeBg: string;
  borderTint: string;
  coursework: string[];
  summary: string;
  isDegree: boolean;
  current?: boolean;
}

const milestones: AcademicMilestone[] = [
  {
    date: '2021 – 2024',
    title: 'B.Tech in Computer Science & Engineering',
    subtitle: 'Undergraduate Engineering Degree (Lateral Entry)',
    institution: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    badge: 'CONFERRED 2024 · CSE DEGREE',
    accentColor: '#818cf8', // Soft Royal Indigo / Periwinkle
    badgeBg: 'bg-indigo-500/20 text-indigo-200 border-indigo-300/40',
    borderTint: 'border-indigo-300/40 hover:border-indigo-300/70',
    coursework: [
      'Advanced Data Structures & Algorithms',
      'Database Management Systems (PostgreSQL, ACID)',
      'Operating Systems & Concurrency',
      'Distributed Systems & Computer Networks',
      'Compiler Design & Formal Languages',
      'Software Engineering Methodologies',
    ],
    summary:
      'Rigorous 3-year intensive CSE curriculum following polytechnic entry. Deepened theoretical foundations in computational complexity, distributed algorithms, relational schema design, and asynchronous networking.',
    isDegree: true,
  },
  {
    date: '2018 – 2021',
    title: 'Diploma in Computer Science & Technology',
    subtitle: 'Polytechnic Engineering Foundation',
    institution: 'West Bengal State Council of Technical Education (WBSCTE)',
    badge: 'COMPLETED 2021 · 3-YEAR POLYTECHNIC',
    accentColor: '#38bdf8', // Lighter Electric Sky
    badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-300/40',
    borderTint: 'border-sky-300/40 hover:border-sky-300/70',
    coursework: [
      'C & C++ Programming Fundamentals',
      'Data Structures in C (Stacks, Queues, Trees)',
      'Digital Electronics & Logic Circuitry',
      'Computer Organization & Microprocessors (8085/8086)',
      'Relational Database Basics & SQL',
    ],
    summary:
      'Three years of rigorous low-level programming and computer hardware fundamentals. Built early projects in C/C++, implemented manual memory management, and grounded software intuition in system hardware behavior.',
    isDegree: true,
  },
  {
    date: '2024',
    title: 'Transition to Independent Systems Engineering',
    subtitle: 'Full-Stack Architecture & Real-Time Software',
    institution: 'Autonomous Production Delivery',
    badge: '15+ SHIPPED REPOSITORIES',
    accentColor: '#34d399', // Lighter Emerald / Mint
    badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-300/40',
    borderTint: 'border-emerald-300/40 hover:border-emerald-300/70',
    coursework: [
      'TelePoint (WebSockets & Sub-42ms Room Mesh)',
      'NanoLink (Base62 URL Hashing & Edge Analytics)',
      'Erpixa (Multi-Tenant ERP with Postgres RLS)',
      'Nexora (Real-Time Collaborative Workspace)',
    ],
    summary:
      'Graduated and dedicated full engineering focus to architecting resilient, production-grade distributed applications with Next.js, TypeScript, PostgreSQL, Prisma, and WebSockets.',
    isDegree: false,
  },
  {
    date: 'Now',
    title: 'Software Systems Engineer & Product Analyst',
    subtitle: 'Bridging Formal CSE Rigor with Real-World Shipping',
    institution: 'Open to Full-Time Software Roles',
    badge: '● AVAILABLE FOR HIRE',
    accentColor: '#fb7185', // Soft Sunset Rose / Coral
    badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-300/40 animate-pulse',
    borderTint: 'border-rose-300/40 hover:border-rose-300/70',
    coursework: [
      'Full-Stack Web Engineering (React / Next.js)',
      'Real-Time WebSockets & API Gateway Architecture',
      'Database Modeling & Index Optimization',
      'System Testing & CI/CD Pipelines',
    ],
    summary:
      'Available for full-time engineering roles. Pairing hands-on software development with data-driven business analysis to deliver high-velocity, deterministic systems with 100% type-safety.',
    isDegree: false,
    current: true,
  },
];

export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.15]"
    >
      {/* ── STICKY TOP CAPTION HOOK ── */}
      <div className="sticky top-20 z-30 mb-8 w-full max-w-4xl mx-auto">
        <div className="glass-hud-pill flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#818cf8] animate-ping" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-white">
              09 // CSE ACADEMIC DEGREE &amp; JOURNEY
            </span>
            <span className="hidden sm:inline-block mono text-xs text-[#818cf8]">
              · VERIFIED CREDENTIALS
            </span>
          </div>
          <span className="mono text-xs text-[#818cf8] px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-300/40 font-bold">
            6 YRS FORMAL CSE
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.14] border border-white/[0.25] text-xs mono text-[#818cf8] mb-3">
            <span>🎓 VERIFIED ACADEMIC FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            Academic Degree &amp; Engineering Path
          </h2>
          <p className="text-sm md:text-base text-[#e2e8f0] mt-2">
            No stock imagery or generic placeholders. Authentic educational milestones combining formal Computer Science degree credentials with independent software shipping.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="relative border-l-2 border-white/[0.25] ml-3 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {milestones.map((item, idx) => (
            <div key={item.date} className="relative group">
              {/* Timeline Marker Dot with Halo */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full border-2 border-white/60 transition-transform duration-300 group-hover:scale-125 shadow-lg ${
                  item.current
                    ? 'bg-[#10b981] ring-4 ring-emerald-400/40 shadow-[0_0_15px_#10b981]'
                    : 'bg-[#818cf8]'
                }`}
                style={{ backgroundColor: item.accentColor }}
              />

              {/* ── DOUBLE-BEZEL ACADEMIC MILESTONE CARD (NO STOCK IMAGE ON DEGREE) ── */}
              <div
                className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-xl relative overflow-hidden group-hover:translate-y-[-2px] ${item.borderTint}`}
                style={{
                  background: 'rgba(255, 255, 255, 0.20)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                }}
              >
                {/* Ambient Corner Specular Glow */}
                <div
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: item.accentColor }}
                />

                <div className="space-y-4 relative z-10">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="mono text-xs font-bold px-3 py-1 rounded-full bg-white/[0.18] text-white border border-white/30">
                        {item.date}
                      </span>
                      <span className="mono text-[11px] text-[#00d2ff] font-medium hidden sm:inline-block">
                        MILESTONE 0{idx + 1}
                      </span>
                    </div>

                    <span
                      className={`mono text-[10px] sm:text-xs px-3 py-1 rounded-full font-bold border ${item.badgeBg}`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">
                      {item.subtitle} · <span className="text-[#00d2ff]">{item.institution}</span>
                    </p>
                  </div>

                  {/* Narrative Summary */}
                  <p className="text-xs sm:text-sm text-[#f1f5f9] leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Academic Syllabus / Shipped Systems Pills */}
                  <div className="pt-3 border-t border-white/[0.15]">
                    <div className="mono text-[10px] uppercase font-bold text-white/70 mb-2">
                      {item.isDegree ? 'Key Coursework & Theoretical Foundations:' : 'Core Competencies & Shipped Architectures:'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.coursework.map((course) => (
                        <span
                          key={course}
                          className="mono text-[10px] sm:text-xs px-2.5 py-1 rounded-lg bg-white/[0.14] text-white border border-white/20 font-medium"
                        >
                          ✓ {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
