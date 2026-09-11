'use client';

/**
 * Original playful software illustrations.
 *
 * Hand-drawn-feeling SVG stickers built from the site palette. Used to give
 * sections character without stock imagery or licensing concerns. Every
 * sticker is decorative and hidden from assistive technology by default.
 */

export type StickerName =
  | 'terminal'
  | 'branch'
  | 'bug'
  | 'rocket'
  | 'stack'
  | 'cloud'
  | 'cube'
  | 'database'
  | 'packet'
  | 'merge'
  | 'brackets'
  | 'spark';

const V = '#7c3aed';
const T = '#0f766e';
const R = '#db2777';
const B = '#1d4ed8';
const A = '#d97706';

function Face({ x = 0, y = 0, wink = false }: { x?: number; y?: number; wink?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke="#15173a" strokeWidth="2" strokeLinecap="round" fill="none">
      <circle cx="-5" cy="0" r="1.4" fill="#15173a" stroke="none" />
      {wink ? <path d="M 3 0 q 2 -2 4 0" /> : <circle cx="5" cy="0" r="1.4" fill="#15173a" stroke="none" />}
      <path d="M -4 5 q 4 3.4 8 0" />
    </g>
  );
}

const ART: Record<StickerName, JSX.Element> = {
  terminal: (
    <g>
      <rect x="6" y="12" width="52" height="40" rx="8" fill={V} opacity=".16" />
      <rect x="6" y="12" width="52" height="40" rx="8" fill="none" stroke={V} strokeWidth="2.6" />
      <path d="M 6 23 H 58" stroke={V} strokeWidth="2.6" />
      <circle cx="13" cy="17.5" r="1.9" fill={R} />
      <circle cx="20" cy="17.5" r="1.9" fill={A} />
      <circle cx="27" cy="17.5" r="1.9" fill={T} />
      <path d="M 15 33 l 6 5 l -6 5" fill="none" stroke={T} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 27 43 h 12" stroke={V} strokeWidth="3" strokeLinecap="round" />
      <Face x={45} y={36} wink />
    </g>
  ),
  branch: (
    <g fill="none" strokeWidth="2.8" strokeLinecap="round">
      <path d="M 20 50 V 20" stroke={V} />
      <path d="M 20 34 q 0 -12 12 -12 h 6" stroke={T} />
      <path d="M 20 44 q 0 10 12 10 h 6" stroke={R} />
      <circle cx="20" cy="16" r="5.5" fill="#fff" stroke={V} />
      <circle cx="44" cy="22" r="5.5" fill="#fff" stroke={T} />
      <circle cx="44" cy="54" r="5.5" fill="#fff" stroke={R} />
      <circle cx="20" cy="54" r="5.5" fill="#fff" stroke={V} />
    </g>
  ),
  bug: (
    <g>
      <ellipse cx="32" cy="36" rx="15" ry="17" fill={T} opacity=".18" />
      <ellipse cx="32" cy="36" rx="15" ry="17" fill="none" stroke={T} strokeWidth="2.6" />
      <path d="M 17 30 L 7 24 M 17 38 L 6 38 M 18 46 L 9 53 M 47 30 L 57 24 M 47 38 L 58 38 M 46 46 L 55 53" stroke={T} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M 25 20 L 21 11 M 39 20 L 43 11" stroke={T} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="21" cy="10" r="2.4" fill={A} />
      <circle cx="43" cy="10" r="2.4" fill={A} />
      <Face x={32} y={32} />
    </g>
  ),
  rocket: (
    <g>
      <path d="M 32 8 c 9 8 13 18 13 28 l -6 7 H 25 l -6 -7 c 0 -10 4 -20 13 -28 Z" fill={R} opacity=".17" stroke={R} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M 19 34 l -8 9 l 9 -1 M 45 34 l 8 9 l -9 -1" fill="none" stroke={V} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="26" r="6" fill="#fff" stroke={B} strokeWidth="2.6" />
      <path d="M 27 50 q 5 9 10 0" fill={A} opacity=".8" />
      <path d="M 30 54 q 2 5 4 0" fill={R} opacity=".85" />
      <Face x={32} y={25} />
    </g>
  ),
  stack: (
    <g strokeWidth="2.6" strokeLinejoin="round">
      <path d="M 32 10 L 56 22 L 32 34 L 8 22 Z" fill={V} opacity=".2" stroke={V} />
      <path d="M 8 32 L 32 44 L 56 32" fill="none" stroke={T} />
      <path d="M 8 42 L 32 54 L 56 42" fill="none" stroke={R} />
      <Face x={32} y={22} wink />
    </g>
  ),
  cloud: (
    <g>
      <path d="M 18 44 a 11 11 0 0 1 1 -21 a 14 14 0 0 1 26 -2 a 10 10 0 0 1 1 23 Z" fill={B} opacity=".16" stroke={B} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M 24 50 v 7 M 32 50 v 10 M 40 50 v 7" stroke={T} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="59" r="2.2" fill={T} />
      <circle cx="32" cy="62" r="2.2" fill={V} />
      <circle cx="40" cy="59" r="2.2" fill={R} />
      <Face x={32} y={30} />
    </g>
  ),
  cube: (
    <g strokeWidth="2.6" strokeLinejoin="round">
      <path d="M 32 9 L 54 21 V 43 L 32 55 L 10 43 V 21 Z" fill={V} opacity=".16" stroke={V} />
      <path d="M 32 9 L 32 31 M 32 31 L 54 21 M 32 31 L 10 21 M 32 31 V 55" fill="none" stroke={T} />
      <Face x={32} y={41} wink />
    </g>
  ),
  database: (
    <g strokeWidth="2.6">
      <ellipse cx="32" cy="17" rx="19" ry="7.5" fill={T} opacity=".2" stroke={T} />
      <path d="M 13 17 v 30 c 0 4 8.5 7.5 19 7.5 s 19 -3.5 19 -7.5 V 17" fill={T} opacity=".1" stroke={T} strokeLinejoin="round" />
      <path d="M 13 29 c 0 4 8.5 7.5 19 7.5 s 19 -3.5 19 -7.5" fill="none" stroke={V} />
      <path d="M 13 40 c 0 4 8.5 7.5 19 7.5 s 19 -3.5 19 -7.5" fill="none" stroke={R} />
      <Face x={32} y={44} />
    </g>
  ),
  packet: (
    <g strokeWidth="2.6" strokeLinecap="round">
      <rect x="12" y="20" width="40" height="26" rx="7" fill={A} opacity=".16" stroke={A} />
      <path d="M 12 27 h 40" stroke={A} />
      <path d="M 4 33 h 6 M 54 33 h 6" stroke={V} />
      <circle cx="20" cy="23.5" r="1.6" fill={V} />
      <path d="M 20 38 h 10 M 36 38 h 8" stroke={T} strokeWidth="3" />
      <Face x={32} y={35} wink />
    </g>
  ),
  merge: (
    <g fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 16 12 v 18 q 0 10 12 10 h 8" stroke={V} />
      <path d="M 48 12 v 18 q 0 10 -12 10 h -8" stroke={T} />
      <path d="M 32 40 v 12" stroke={R} />
      <path d="M 26 46 l 6 6 l 6 -6" stroke={R} />
      <circle cx="16" cy="10" r="4.6" fill="#fff" stroke={V} />
      <circle cx="48" cy="10" r="4.6" fill="#fff" stroke={T} />
    </g>
  ),
  brackets: (
    <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 24 14 q -10 0 -10 8 v 6 q 0 4 -6 4 q 6 0 6 4 v 6 q 0 8 10 8" stroke={V} />
      <path d="M 40 14 q 10 0 10 8 v 6 q 0 4 6 4 q -6 0 -6 4 v 6 q 0 8 -10 8" stroke={T} />
      <circle cx="32" cy="32" r="3" fill={R} stroke="none" />
    </g>
  ),
  spark: (
    <g>
      <path d="M 32 8 l 5 16 l 16 5 l -16 5 l -5 16 l -5 -16 l -16 -5 l 16 -5 Z" fill={A} opacity=".2" stroke={A} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M 51 44 l 2.4 7 l 7 2.4 l -7 2.4 l -2.4 7 l -2.4 -7 l -7 -2.4 l 7 -2.4 Z" fill={V} opacity=".28" stroke={V} strokeWidth="2" strokeLinejoin="round" />
      <Face x={32} y={28} wink />
    </g>
  ),
};

export default function Sticker({
  name,
  size = 64,
  className = '',
  label,
}: {
  name: StickerName;
  size?: number;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      className={`sticker ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {ART[name]}
    </svg>
  );
}
