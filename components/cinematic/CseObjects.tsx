'use client';
import { useEffect, useRef } from 'react';

/* ─── individual floating CSE chip ─── */
interface ChipProps {
  label: string;
  style?: React.CSSProperties;
  variant?: 'code' | 'node' | 'bit' | 'pill' | 'symbol';
  className?: string;
}
function Chip({ label, style, variant = 'pill', className = '' }: ChipProps) {
  return (
    <span
      aria-hidden="true"
      className={`cse-chip cse-chip--${variant} ${className}`}
      style={style}
    >
      {label}
    </span>
  );
}

/* ─── Opening section objects: code + binary ─── */
export function OpeningCseObjects() {
  return (
    <div className="cse-layer" aria-hidden="true">
      <Chip label="{ }" variant="code" className="cse-o1" />
      <Chip label="async/await" variant="pill" className="cse-o2" />
      <Chip label="01101001" variant="bit" className="cse-o3" />
      <Chip label="→ 201 OK" variant="node" className="cse-o4" />
      <Chip label="λ" variant="symbol" className="cse-o5" />
      <Chip label="git commit" variant="pill" className="cse-o6" />
      <Chip label="10110100" variant="bit" className="cse-o7" />
      <Chip label="O(log n)" variant="symbol" className="cse-o8" />
    </div>
  );
}

/* ─── Identity section objects: human + system ─── */
export function IdentityCseObjects() {
  return (
    <div className="cse-layer" aria-hidden="true">
      <Chip label="Full-Stack" variant="pill" className="cse-i1" />
      <Chip label="interface →" variant="code" className="cse-i2" />
      <Chip label="useEffect" variant="code" className="cse-i3" />
      <Chip label="REST API" variant="node" className="cse-i4" />
      <Chip label="∑ experience" variant="symbol" className="cse-i5" />
      <Chip label="01001000" variant="bit" className="cse-i6" />
    </div>
  );
}

/* ─── Stack section objects: layers ─── */
export function StackCseObjects() {
  return (
    <div className="cse-layer" aria-hidden="true">
      <Chip label="POST /api/links" variant="code" className="cse-s1" />
      <Chip label="Zod.parse()" variant="code" className="cse-s2" />
      <Chip label="prisma.link.create()" variant="pill" className="cse-s3" />
      <Chip label="→ PostgreSQL" variant="node" className="cse-s4" />
      <Chip label="TCP/IP" variant="symbol" className="cse-s5" />
      <Chip label="304 Cache" variant="node" className="cse-s6" />
      <Chip label="11001010" variant="bit" className="cse-s7" />
      <Chip label="schema.ts" variant="pill" className="cse-s8" />
    </div>
  );
}

/* ─── Projects section objects: product-level ─── */
export function ProjectsCseObjects() {
  return (
    <div className="cse-layer" aria-hidden="true">
      <Chip label="nanoid(8)" variant="code" className="cse-p1" />
      <Chip label="bcrypt hash" variant="pill" className="cse-p2" />
      <Chip label="supabase.from()" variant="code" className="cse-p3" />
      <Chip label="redirect 301" variant="node" className="cse-p4" />
      <Chip label="UPI split" variant="symbol" className="cse-p5" />
      <Chip label="10011011" variant="bit" className="cse-p6" />
    </div>
  );
}

/* ─── Contact section objects: connection ─── */
export function ContactCseObjects() {
  return (
    <div className="cse-layer" aria-hidden="true">
      <Chip label="mailto:" variant="code" className="cse-c1" />
      <Chip label="SMTP / TLS" variant="node" className="cse-c2" />
      <Chip label="01101000" variant="bit" className="cse-c3" />
      <Chip label="git push origin" variant="pill" className="cse-c4" />
      <Chip label="∞ iterate" variant="symbol" className="cse-c5" />
    </div>
  );
}
