'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { ArrowUpRightIcon } from '@/components/icons';

export default function HeroShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>('nanolink');

  const primaryProject = projects.find((p) => p.slug === activeSlug) || projects[1];
  const secondaryProject = activeSlug === 'telepoint' ? projects[1] : projects[2];

  const primaryHost = new URL(primaryProject.url).hostname;
  const secondaryHost = new URL(secondaryProject.url).hostname;

  return (
    <div
      className="hero-project-showcase"
      aria-label="Verified Production Systems Showcase"
    >
      {/* Project Quick Selector Tabs */}
      <div className="showcase-selector-bar" role="tablist" aria-label="Featured production software projects">
        {projects.map((p) => (
          <button
            key={p.slug}
            type="button"
            role="tab"
            aria-selected={activeSlug === p.slug}
            className={`showcase-tab ${activeSlug === p.slug ? 'active' : ''}`}
            onClick={() => setActiveSlug(p.slug)}
          >
            <span className="tab-status-dot" aria-hidden="true" />
            {p.name}
          </button>
        ))}
      </div>

      <div className="showcase-planes-stage">
        {/* Secondary Background Layer Plane (Floating 3D Perspective) */}
        <Link
          href={`/project/${secondaryProject.slug}`}
          prefetch={false}
          className="showcase-layer-card secondary-card glass-panel"
          aria-label={`View ${secondaryProject.name} details`}
          tabIndex={-1}
        >
          <div className="showcase-window-bar">
            <div className="window-dots" aria-hidden="true">
              <span className="dot dot-close" />
              <span className="dot dot-min" />
              <span className="dot dot-max" />
            </div>
            <span className="window-host-tag">{secondaryHost}</span>
            <span className="window-status-pill">Production</span>
          </div>
          <div className="showcase-img-wrap">
            <Image
              src={secondaryProject.previewImage}
              alt={secondaryProject.imageAlt}
              fill
              sizes="(max-width: 799px) 70vw, 360px"
              priority={false}
            />
            <div className="showcase-img-sheen" aria-hidden="true" />
          </div>
        </Link>

        {/* Primary Foreground Plane (Interactive Production System Window) */}
        <div className="showcase-layer-card primary-card hero-main-image glass-panel">
          <div className="showcase-window-bar">
            <div className="window-dots" aria-hidden="true">
              <span className="dot dot-close" />
              <span className="dot dot-min" />
              <span className="dot dot-max" />
            </div>

            <div className="window-address-pill">
              <span className="window-lock-icon" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <span className="window-host-tag">{primaryHost}</span>
            </div>

            <a
              href={primaryProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="window-live-action"
              aria-label={`Open ${primaryProject.name} live application`}
            >
              <span className="live-pulse-dot" aria-hidden="true" />
              <span>Live System</span>
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>

          <Link
            href={`/project/${primaryProject.slug}`}
            prefetch={false}
            className="showcase-main-img-link"
            aria-label={`Inspect ${primaryProject.name} engineering decisions`}
          >
            <div className="showcase-main-img-wrap">
              <Image
                src={primaryProject.previewImage}
                alt={primaryProject.imageAlt}
                fill
                sizes="(max-width: 799px) 90vw, 560px"
                priority
              />
              <div className="showcase-img-sheen" aria-hidden="true" />
            </div>
          </Link>

          <div className="showcase-footer-bar">
            <div className="showcase-meta-info">
              <strong>{primaryProject.name}</strong>
              <span>{primaryProject.blurb}</span>
            </div>
            <Link
              href={`/project/${primaryProject.slug}`}
              className="showcase-inspect-cta"
            >
              Inspect Architecture
              <ArrowUpRightIcon aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Floating Architecture Milestone Badge */}
        <div className="showcase-floating-pill glass-panel" aria-hidden="true">
          <span className="pill-dot" />
          <span>From requirements to production software</span>
        </div>
      </div>
    </div>
  );
}
