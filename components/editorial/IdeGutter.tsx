"use client";

import React from "react";

interface IdeGutterProps {
  activeSection: string;
}

const sections = [
  { id: "sec-001", label: "001", title: "001: Hero" },
  { id: "sec-002", label: "002", title: "002: About" },
  { id: "sec-003", label: "003", title: "003: Work" },
  { id: "sec-004", label: "004", title: "004: Featured" },
  { id: "sec-005", label: "005", title: "005: Craft" },
  { id: "sec-006", label: "006", title: "006: Notes" },
  { id: "sec-007", label: "007", title: "007: Journey" },
  { id: "sec-008", label: "008", title: "008: Contact" },
];

export default function IdeGutter({ activeSection }: IdeGutterProps) {
  return (
    <aside className="ide-gutter" aria-label="Editor Gutter Navigation">
      <div className="gutter-brand">BISWADIP.IN</div>
      <nav className="gutter-rail">
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className={`gutter-item ${activeSection === sec.id ? "active" : ""}`}
            title={sec.title}
          >
            {sec.label}
          </a>
        ))}
      </nav>
      <div className="gutter-status" title="Status: Online & Ready">
        <div className="status-dot" />
      </div>
    </aside>
  );
}
