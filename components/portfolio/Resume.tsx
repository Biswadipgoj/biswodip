'use client';

import { useState } from 'react';
import Image from 'next/image';
import { personal, resumeCopy, experience, stack, schooling, education } from '@/lib/data';
import { useEditorialReveal } from '@/components/cinematic/useScene';
import { ArrowDownIcon, ArrowUpRightIcon } from '@/components/icons';

export default function Resume() {
  const ref = useEditorialReveal();
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      id="resume"
      ref={ref}
      className="resume-section section-space"
      data-motion-root
      aria-labelledby="resume-title"
    >
      <header className="section-heading">
        <p className="section-index">06 / Credentials &amp; Résumé</p>
        <h2 id="resume-title">{resumeCopy.title}</h2>
        <p>{resumeCopy.summary}</p>
      </header>

      <div className="resume-layout">
        {/* Left Column: Structured Professional Experience & Credentials Timeline */}
        <div className="resume-experience-col">
          <h3 className="resume-col-title">{resumeCopy.experience}</h3>

          <ol className="resume-timeline" aria-label="Professional work experience">
            {experience.map((item) => (
              <li key={item.organization} className="resume-timeline-item" data-reveal>
                <div className="resume-item-header">
                  <span className="resume-period-badge">{item.period}</span>
                  <h4 className="resume-role-title">{item.role}</h4>
                  <p className="resume-org-name">{item.organization}</p>
                </div>
                <ul className="resume-bullet-list">
                  {item.highlights
                    .filter((line) => !line.includes('60+'))
                    .map((line) => (
                      <li key={line} className="resume-bullet">
                        {line}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="resume-academic-summary" data-reveal>
            <h4 className="resume-subheading">Verified Education</h4>
            <ul className="resume-education-list">
              {education.map((deg) => (
                <li key={deg.title} className="resume-edu-item">
                  <strong>{deg.title}</strong>
                  <span>{deg.institution} · {deg.date}</span>
                </li>
              ))}
              <li className="resume-edu-item">
                <strong>{schooling.title}</strong>
                <span>{schooling.institution} · {schooling.date}</span>
              </li>
            </ul>
          </div>

          <details className="resume-skills-drawer">
            <summary className="resume-skills-trigger">{resumeCopy.skills} (Expand breakdown)</summary>
            <div className="resume-skills-grid">
              {stack.map((group) => (
                <div key={group.title} className="resume-skill-cat">
                  <strong>{group.title}</strong>
                  <p>{group.tools.join(' · ')}</p>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Right Column: Confidential Recruiter Dossier Hub & Protected Document Vault */}
        <aside className="resume-vault-col" aria-label="Recruiter Document Vault">
          <div className="resume-dossier-card glass-panel">
            <div className="dossier-header">
              <div className="dossier-badge-row">
                <span className="dossier-pill pill-verified">ATS-COMPLIANT</span>
                <span className="dossier-pill pill-format">2 PAGES · VECTOR PDF</span>
                <span className="dossier-pill pill-status">ACTIVE</span>
              </div>
              <h4 className="dossier-title">Official Candidate Dossier</h4>
              <p className="dossier-meta">
                Verified background: Full-Stack Engineering, Contract Engagements, Relational Schemas, and
                Brainware University credentials.
              </p>
            </div>

            {/* Document Privacy Shield: Protects raw paper resume from casual exposure */}
            <div className="document-shield-container">
              <div className="document-preview-frame">
                <Image
                  src="/resume-preview.webp"
                  alt="First page preview of Biswodip Goj’s verified résumé"
                  width={595}
                  height={842}
                  sizes="(max-width: 799px) 85vw, 380px"
                  className={`document-preview-img ${revealed ? 'revealed' : 'shielded'}`}
                  priority={false}
                />

                {!revealed && (
                  <div className="document-privacy-veil" aria-hidden="false">
                    <div className="privacy-shield-icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <span className="privacy-shield-text">Document Preview Shielded</span>
                    <span className="privacy-shield-sub">Click below to reveal or download the full document</span>
                    <button
                      type="button"
                      className="privacy-reveal-btn"
                      onClick={() => setRevealed(true)}
                      aria-label="Reveal résumé document preview"
                    >
                      Reveal Document Preview
                    </button>
                  </div>
                )}
              </div>

              {revealed && (
                <div className="document-hide-bar">
                  <span>Document preview unshielded</span>
                  <button
                    type="button"
                    className="privacy-hide-btn"
                    onClick={() => setRevealed(false)}
                    aria-label="Hide document preview"
                  >
                    Shield Document
                  </button>
                </div>
              )}
            </div>

            <div className="dossier-actions">
              <a
                href={personal.resume}
                download
                className="action action-primary resume-download-btn"
                aria-label="Download official ATS résumé PDF"
              >
                {resumeCopy.pdf}
                <ArrowDownIcon aria-hidden="true" />
              </a>

              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="action action-quiet resume-open-btn"
                aria-label="Open résumé PDF in new tab"
              >
                {resumeCopy.preview}
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
