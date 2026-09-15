'use client';

import { useEffect, useRef } from 'react';
import { useExperience } from '../ExperienceProvider';

export default function AuroraField() {
  const { animated, spatial } = useExperience();
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = layer.current;
    if (!node || !spatial) return;
    let frame = 0;
    let previous = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const apply = (time: number) => {
      frame = 0;
      if (document.hidden) return;
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      const blend = 1 - Math.exp(-8 * delta);
      x += (targetX - x) * blend;
      y += (targetY - y) * blend;
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05) {
        frame = requestAnimationFrame(apply);
      } else {
        previous = 0;
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = (event.clientX / width - 0.5) * -16;
      targetY = (event.clientY / height - 0.5) * -16;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', resize);
      if (frame) cancelAnimationFrame(frame);
      node.style.transform = '';
    };
  }, [spatial]);

  const blobStyle = {
    filter: 'none',
    mixBlendMode: 'normal' as const,
    animationPlayState: animated ? 'running' : 'paused',
    willChange: animated ? 'transform' : 'auto',
  };

  return (
    <div className="aurora-field" aria-hidden="true">
      <div ref={layer} className="aurora-layer" style={{ willChange: spatial ? 'transform' : 'auto' }}>
        <span className="aurora-blob blob-1" style={blobStyle} />
        <span className="aurora-blob blob-2" style={blobStyle} />
        <span className="aurora-blob blob-4" style={blobStyle} />
      </div>
      <div className="aurora-grid" />
      <div className="aurora-veil" />
    </div>
  );
}
