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
                    .filter((line) => !line.includes('50+') && !line.includes('60+'))
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
            <h4 className="resume-subheading">Education</h4>
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

        {/* Right column: the candidate card, the PDF preview and its download. */}
        <aside className="resume-vault-col" aria-label="Résumé PDF">
          <div className="resume-dossier-card glass-panel">
            <div className="dossier-candidate">
              <div className="candidate-photo">
                <Image src="/biswodip.png" alt={`${personal.name}, portrait`} width={160} height={160} sizes="80px" />
              </div>
              <div>
                <p className="candidate-name">{personal.name}</p>
                <p className="candidate-role">{personal.role}</p>
                <p className="candidate-meta"><span className="status-dot" aria-hidden="true" />{personal.location}</p>
              </div>
            </div>
            <div className="dossier-header">
              <h4 className="dossier-title">Résumé</h4>
              <p className="dossier-meta">PDF · 2 pages · selectable text</p>
            </div>

            {/* The preview starts hidden so the phone number on page one is not on show by default. */}
            <div className="document-shield-container">
              <div className="document-preview-frame">
                <Image
                  src="/resume-preview.webp"
                  alt="First page of Biswodip Goj’s résumé"
                  width={595}
                  height={842}
                  sizes="(max-width: 799px) 85vw, 380px"
                  className={`document-preview-img ${revealed ? 'revealed' : 'shielded'}`}
                  priority
                />

                {!revealed && (
                  <div className="document-privacy-veil" aria-hidden="false">
                    <div className="privacy-shield-icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <span className="privacy-shield-text">Preview hidden</span>
                    <span className="privacy-shield-sub">Page one includes contact details. Show it here or download the PDF.</span>
                    <button
                      type="button"
                      className="reveal-pill privacy-reveal-btn"
                      onClick={() => setRevealed(true)}
                      aria-label="Show résumé preview"
                    >
                      Show preview
                    </button>
                  </div>
                )}
              </div>

              {revealed && (
                <div className="document-hide-bar">
                  <span>Preview visible</span>
                  <button
                    type="button"
                    className="privacy-hide-btn"
                    onClick={() => setRevealed(false)}
                    aria-label="Hide résumé preview"
                  >
                    Hide preview
                  </button>
                </div>
              )}
            </div>

            <div className="dossier-actions">
              <a href={personal.resume} download className="file-download" aria-label="Download résumé PDF, 2 pages">
                <span className="file-download-icon" aria-hidden="true">PDF</span>
                <span className="file-download-text">
                  <strong>{resumeCopy.pdf}</strong>
                  <span>Biswodip-Goj-Resume.pdf · 2 pages</span>
                </span>
                <ArrowDownIcon aria-hidden="true" />
              </a>

              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link resume-open-btn"
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
