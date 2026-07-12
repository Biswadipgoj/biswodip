'use client';

import { useMemo } from 'react';

/**
 * RingLight — a physical photography ring-light, rebuilt in CSS.
 *
 * A dim track ring holds evenly-spaced LED bulbs that twinkle out of
 * phase, a bright dual-colour highlight sweeps continuously around the
 * track, and the whole thing breathes with a slow glow pulse — the
 * combination reads as a light source that's genuinely switched on,
 * not a static decal.
 */
export default function RingLight({
  size = 320,
  thickness = 14,
  bulbCount = 24,
  colorA = '#22d3ee',
  colorB = '#a78bfa',
  speed = 7,
  className = '',
}: {
  size?: number;
  thickness?: number;
  bulbCount?: number;
  colorA?: string;
  colorB?: string;
  speed?: number;
  className?: string;
}) {
  const bulbs = useMemo(() => {
    const r = size / 2 - thickness / 2;
    // Rounded to 2dp — Node's and the browser's libm can disagree in the
    // last float digit, which would otherwise trip a hydration mismatch.
    const round = (n: number) => Math.round(n * 100) / 100;
    return Array.from({ length: bulbCount }, (_, i) => {
      const a = (i / bulbCount) * Math.PI * 2;
      return {
        x: round(Math.cos(a) * r),
        y: round(Math.sin(a) * r),
        delay: round((i / bulbCount) * 2.6),
        color: i % 2 === 0 ? colorA : colorB,
      };
    });
  }, [size, thickness, bulbCount, colorA, colorB]);

  return (
    <div
      aria-hidden
      className={`ring-light pointer-events-none absolute ${className}`}
      style={
        {
          width: size,
          height: size,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          '--rl-a': colorA,
          '--rl-b': colorB,
          '--rl-thick': `${thickness}px`,
          '--rl-speed': `${speed}s`,
          '--rl-glow': `${colorA}59`,
        } as React.CSSProperties
      }
    >
      <div className="ring-light-breathe" />
      <div className="ring-light-track" />
      <div className="ring-light-sweep" />
      <div className="ring-light-sweep ring-light-sweep-b" />
      {bulbs.map((b, i) => (
        <span
          key={i}
          className="ring-light-bulb"
          style={
            {
              transform: `translate(-50%, -50%) translate(${b.x}px, ${b.y}px)`,
              animationDelay: `${b.delay}s`,
              '--bulb-color': b.color,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
