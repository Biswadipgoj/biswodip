"use client";

import React from "react";

interface TimelineEntry {
  period: string;
  role: string;
  organization: string;
  description: string;
  technologies: string[];
}

const entries: TimelineEntry[] = [
  {
    period: "2024 — PRESENT",
    role: "Full-Stack Software Engineer",
    organization: "Independent Engineering & Systems Architecture",
    description: "Building production software, developer tools, and web applications. Developed Erpixa (enterprise resource platform), NanoLink (edge URL router), and Kestrel (Raft consensus cache engine in Rust).",
    technologies: ["TypeScript", "Next.js", "Rust", "PostgreSQL", "Cloudflare"],
  },
  {
    period: "2021 — 2024",
    role: "B.Tech in Computer Science & Engineering",
    organization: "University Engineering Curriculum · West Bengal",
    description: "Studied core computer science: Operating Systems, Computer Networks, Database Management Systems, Compiler Design, Distributed Computing, and Object-Oriented Software Design.",
    technologies: ["Algorithms", "OS & Memory", "C++", "Java", "SQL", "Networking"],
  },
  {
    period: "2018 — 2021",
    role: "Diploma in Computer Science & Technology",
    organization: "Technical Education Institute · West Bengal",
    description: "Built the foundation in programming, boolean logic, discrete mathematics, data structures, and web standards. Began building dynamic web projects and database tools.",
    technologies: ["C", "Data Structures", "Linux", "HTML/CSS", "JavaScript", "MySQL"],
  },
];

export default function JourneySection() {
  return (
    <section id="sec-007" className="section-wrap" aria-label="Education and Career Trajectory">
      <header className="section-header">
        <div className="section-tag">{"007 // TIMELINE & MILESTONES"}</div>
        <h2 className="section-title">Timeline of education and engineering work.</h2>
        <p className="section-subtitle">
          Six years of continuous study and practice in computer science and software development.
        </p>
      </header>

      <div className="space-y-8 max-w-3xl">
        {entries.map((entry, idx) => (
          <div
            key={idx}
            className="card-volumetric p-7 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-start"
          >
            <div className="font-mono text-xs font-semibold text-[var(--accent)] tracking-wider">
              {entry.period}
            </div>

            <div>
              <h3 className="font-display text-xl font-medium text-[var(--ink)] mb-1">
                {entry.role}
              </h3>
              <div className="font-mono text-xs text-[var(--accent-ink)] mb-3 font-semibold">
                {"// "}{entry.organization}
              </div>
              <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-4">
                {entry.description}
              </p>

              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {entry.technologies.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-sm text-[var(--ink-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
