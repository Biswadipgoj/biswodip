'use client';

import { useEffect, useRef } from 'react';

/**
 * Fixed luminous aurora field behind every page.
 * Mid-tone periwinkle base with drifting violet / cyan / rose blooms,
 * a faint engineering grid and a soft specular veil.
 *
 * Self-contained: reads pointer/motion capability directly so it can mount
 * in the root layout and cover the project detail routes too.
 */
export default function AuroraField() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = layer.current;
    if (!node) return;

    const capable = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const move = (event: PointerEvent) => {
      x = (event.clientX / window.innerWidth - 0.5) * -34;
      y = (event.clientY / window.innerHeight - 0.5) * -34;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const bind = () => {
      window.removeEventListener('pointermove', move);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      node.style.transform = '';
      if (capable.matches && !calm.matches) {
        window.addEventListener('pointermove', move, { passive: true });
      }
    };

    bind();
    capable.addEventListener('change', bind);
    calm.addEventListener('change', bind);
    return () => {
      capable.removeEventListener('change', bind);
      calm.removeEventListener('change', bind);
      window.removeEventListener('pointermove', move);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="aurora-field" aria-hidden="true">
      <div ref={layer} className="aurora-layer">
        <span className="aurora-blob blob-1" />
        <span className="aurora-blob blob-2" />
        <span className="aurora-blob blob-3" />
        <span className="aurora-blob blob-4" />
      </div>
      <div className="aurora-grid" />
      <div className="aurora-veil" />
    </div>
  );
}
